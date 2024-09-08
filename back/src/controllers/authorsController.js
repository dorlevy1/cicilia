const authorService = require("../services/authorService");
const getAll = () => {
    return authorService.getAll()
}

const uploadImage = (file) => {
    return authorService.uploadImage(file)
}

const createAuthor = (data) => {
    return authorService.createAuthor(data)
};

const updateAuthor = (id) => {
    return authorService.updateAuthor(id)
}

const deleteAuthor = (id) => {
    return authorService.deleteAuthor(id)
}

const toggleAuthor = (id)=>{
    return authorService.toggleAuthor(id)
}

module.exports = {getAll, createAuthor,toggleAuthor, updateAuthor, uploadImage,deleteAuthor}