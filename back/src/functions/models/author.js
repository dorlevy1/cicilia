const Joi = require("joi");
const fireorm = require("fireorm");

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
    createdAt:Joi.date().optional()
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

module.exports = {getAuthorRepository, Author, authorSchema};
