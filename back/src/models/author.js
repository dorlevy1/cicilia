const {fireorm, getBucket} = require('../utils/firebase');
const Joi = require("joi");

// Define Author class
class Author {
    constructor() {
        this.id = null;
        this.name = '';
        this.age = 0;
        this.state = '';
        this.picture = '';
        this.isActive = true;
    }
}


const authorSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(20).max(120).required(),
    state: Joi.string().optional(),
    picture: Joi.string().optional(),
});


// Create a singleton repository for the Author collection
fireorm.Collection('authors')(Author);
let authorRepositoryInstance = null;

const getAuthorRepository = () => {
    if (!authorRepositoryInstance) {
        authorRepositoryInstance = fireorm.getRepository(Author);  // Use the plain model class here
    }
    return authorRepositoryInstance;
};

module.exports = {getAuthorRepository, Author, authorSchema, getBucket};
