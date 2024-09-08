const {getAuthorRepository, getBucket, authorSchema} = require("../models/author");
const {validateSchema, uploadFile} = require("../utils/helpers");
const {getBookRepository} = require("../models/book");
const {db} = require("../utils/firebase");
const getAll = async () => {
    try {
        const repo = getAuthorRepository();
        return repo.find();
    } catch (e) {
        return {message: 'Error Connection', success: false}
    }
}

const uploadImage = (file) => {
    return uploadFile('authors', file)
}

const createAuthor = async (data) => {
    try {
        validateSchema(authorSchema, data)
        const repo = getAuthorRepository();
        const author = await repo.create({...data,isActive:true})
        if (author) {
            return author
        }
    } catch (e) {
        return {message: e.message, success: false}

    }
};

const updateAuthor = async (id, newData) => {
    try {
        validateSchema(authorSchema, newData)
        const repo = getAuthorRepository();
        const author = await repo.findById(id)

        if (author) {
            const updatedAuthor = {...author, ...newData};
            return repo.update(updatedAuthor);
        }
        return {message: 'Author not found', success: false}

    } catch (error) {
        return {message: error.message, success: false}
    }
}

const deleteAuthor = async (id, newData) => {
    try {
        validateSchema(authorSchema, newData)
        const repo = getAuthorRepository();
        const author = await repo.findById(id)

        if (author) {
            return repo.delete(id)
        }
        return {message: 'Author not found', success: false}

    } catch (error) {
        return {message: error.message, success: false}
    }
}

const toggleAuthor = async (id) => {
    try {
        const repo = getAuthorRepository();
        const author = await repo.findById(id)
        author.isActive = !author.isActive
        await repo.update(author)
        const bookRepo = getBookRepository();
        const books = await bookRepo.whereEqualTo('authorRef.path', `authors/${id}`).find()
        books.map(book => {
            book.isActive = !book.isActive
            return bookRepo.update(book)
        })

        return repo.find()
    } catch (e) {
        return {message: e.message, success: false}

    }
}

module.exports = {getAll, uploadImage, updateAuthor, createAuthor, toggleAuthor, deleteAuthor}