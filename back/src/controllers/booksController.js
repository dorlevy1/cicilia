const bookService = require("../services/bookService");
const getAll = () => {
    return bookService.getAll()
}

const uploadImage = (file) => {
    return bookService.uploadImage(file)
}

const createBook = (data) => {
    return bookService.createBook(data)
};

const updateBook = (id) => {
    return bookService.updateBook(id)
}

const deleteBook = (id) => {
    return bookService.deleteBook(id)
}

const toggleBook = (id)=>{
    return bookService.toggleBook(id)
}


module.exports = {getAll,toggleBook, createBook, updateBook, uploadImage,deleteBook}