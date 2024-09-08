const Joi = require('joi');
const {fireorm, getBucket, db} = require('../utils/firebase');


class Book {
    constructor() {
        this.id = null
        this.title = '';
        this.description = '';
        this.authorRef = null; // Firestore DocumentReference
        this.price = 0;
        this.category = '';
        this.picture = '';
        this.isActive = true;
    }
}

const bookSchema = Joi.object({
    title: Joi.string()
        .required()
        .custom(async (value, helpers) => {
            const {authorRef} = helpers.state.ancestors[0];
            const collection = await db.collection('books')
                .where('title', '==', value)
                .where('authorRef.id', '==', authorRef)
                .get();

            if (!collection.empty) {
                return helpers.error('any.invalid', {message: 'Title must be unique per author'});
            }
            return value;
        }),
    price: Joi.number()
        .min(10)
        .max(100)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price must be at least 10',
            'number.max': 'Price must be no more than 100'
        }),
    description: Joi.string()
        .required()
        .messages({
            'string.empty': 'Description cannot be empty',
        }),
    category: Joi.string()
        .required()
        .messages({
            'string.empty': 'Category is required'
        }),
    picture: Joi.string()
        .uri()
        .optional()
        .messages({
            'string.uri': 'Image must be a valid URL'
        }),
    authorRef: Joi.string()
        .required()
        .messages({
            'string.empty': 'Author is required',
        }),

});
fireorm.Collection('books')(Book);

let bookRepositoryInstance = null;

const getBookRepository = () => {
    if (!bookRepositoryInstance) {
        bookRepositoryInstance = fireorm.getRepository(Book);  // Get the repository for Book
    }
    return bookRepositoryInstance;
};

module.exports = {getBookRepository, bookSchema, getBucket};