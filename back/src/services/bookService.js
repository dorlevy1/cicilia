const {validateSchema, uploadFile} = require("../utils/helpers");
const {bookSchema, getBookRepository} = require("../models/book");
const {db} = require("../utils/firebase");
const getAll = async () => {
    try {
        const repo = getBookRepository();
        const books = await repo.find()
        return Promise.all(books.map(async book => {
            let authorRef = db.doc(book.authorRef.path)
            const doc = await authorRef.get()
            book.authorRef = doc.data()
            return book
        }));
    } catch (e) {
        return {message: 'Error Connection', success: false}
    }
}

const uploadImage = (file) => {
    return uploadFile('books', file)
}

const createBook = async (data) => {
    try {
        validateSchema(bookSchema, data)
        const repo = getBookRepository();
        const authorRef = db.collection('authors').doc(data.authorRef)

        const book = await repo.create({...data, authorRef,isActive:true})
        if (book) {
            return repo.find()
        }
    } catch (e) {
        return {message: e.message, success: false}

    }
};

const updateBook = async (id, newData) => {
    try {
        validateSchema(bookSchema, newData)
        const repo = getBookRepository();
        const book = await repo.findById(id)

        if (book) {
            const updatedBook = {...book, ...newData};
            return repo.update(updatedBook);
        }
        return {message: 'Book not found', success: false}

    } catch (error) {
        return {message: error.message, success: false}
    }
}

const deleteBook = async (id, newData) => {
    try {
        validateSchema(bookSchema, newData)
        const repo = getBookRepository();
        const book = await repo.findById(id)

        if (book) {
            return repo.delete(id)
        }
        return {message: 'Book not found', success: false}

    } catch (error) {
        return {message: error.message, success: false}
    }
}

const toggleBook = async (id) => {
    try {
        const repo = getBookRepository();
        const book = await repo.findById(id)
        book.isActive = !book.isActive
        await repo.update(book)
        return repo.find()
    } catch (e) {
        return {message: e.message, success: false}

    }
}

module.exports = {getAll, toggleBook, uploadImage, updateBook, createBook, deleteBook}