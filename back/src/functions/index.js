const functions = require('firebase-functions');
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
const {initialize} = require("fireorm");
const {Author, getAuthorRepository, authorSchema} = require("./models/author");
const express = require('express');
const {getBookRepository, Book, bookSchema} = require("./models/book");
const app = express(); // Initialize an Express app
app.use(express.json()); // Enable JSON body parsing

admin.initializeApp();
const db = admin.firestore()
initialize(db)

const validateSchema = (schema, data) => {
    const {error} = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};


const toggle = async (collection, id) => {
    try {
        const ref = await db.collection(collection).doc(id);
        const snap = await ref.get();
        if (!snap.exists) {
            logger.info('No active author found to deactivate.')
            return {message: 'No active author found to deactivate.'};
        }
        const current = snap.data();

        await ref.update({isActive: !current.isActive})

        logger.info(`${current.name} is deactivated successfully.`)
        return {message: `${current.name} is deactivated successfully.`};
    } catch (error) {
        logger.error('Unable to deactivate author')
        throw new functions.https.HttpsError('internal', 'Unable to deactivate author', error);
    }
}

exports.toggleAuthor = functions.https.onCall(async (data, context) => {
    return toggle('authors', data.id)
});

exports.toggleBook = functions.https.onCall(async (data, context) => {
    return toggle('books', data.id)
});

exports.addAuthor = functions.https.onCall(async (data, context) => {
    const {name, age, state, picture} = data;
    const authorRepository = getAuthorRepository();

    validateSchema(authorSchema, data)
    const newAuthor = new Author();
    newAuthor.name = name;
    newAuthor.age = age;
    newAuthor.state = state;
    newAuthor.picture = picture;
    newAuthor.isActive = true;
    newAuthor.createdAt = admin.firestore.Timestamp.now();

    try {
        const savedAuthor = await authorRepository.create(newAuthor);
        return {success: true, message: "Author added successfully!", author: savedAuthor};
    } catch (error) {
        return {success: false, error: error.message}
    }
});

exports.addBook = functions.https.onCall(async (data, context) => {
    const {title, authorRef, price, category, description, picture} = data;
    const bookRepository = getBookRepository();
    validateSchema(bookSchema, data)

    const newBook = new Book();
    newBook.title = title;
    newBook.authorRef = await db.collection('authors').doc(authorRef); // Reference to the author
    newBook.price = price;
    newBook.description = description;
    newBook.category = category;
    newBook.picture = picture;
    newBook.isActive = true;
    newBook.createdAt = admin.firestore.Timestamp.now();

    try {
        const savedBook = await bookRepository.create(newBook);
        return {
            success: true,
            message: 'Book added successfully!',
            book: {
                id: savedBook.id,  // Assuming savedBook has an ID field
                title: savedBook.title,
                price: savedBook.price,
                category: savedBook.category,
                description: savedBook.description,
                picture: savedBook.picture,
                createdAt: savedBook.createdAt.toDate().toISOString(),  // Convert Timestamp to ISO string
                authorRef: savedBook.authorRef.id // Return only the author document ID (serializable)
            }
        };
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Unable to add the book', error);
    }
});


