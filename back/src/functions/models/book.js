const Joi = require('joi');
const fireorm = require("fireorm");


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
       ,
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
    createdAt: Joi.date().optional()


});
fireorm.Collection('books')(Book);

let bookRepositoryInstance = null;

const getBookRepository = () => {
    if (!bookRepositoryInstance) {
        bookRepositoryInstance = fireorm.getRepository(Book);  // Get the repository for Book
    }
    return bookRepositoryInstance;
};

module.exports = {getBookRepository, bookSchema, Book};