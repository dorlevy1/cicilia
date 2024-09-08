const express = require('express');
const multer = require("multer");
const bookController = require("../controllers/booksController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const repo = await bookController.getAll()
        res.status(200).send(repo);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.post('/', upload.single('picture'), async (req, res) => {
    const newAuthor = req.body;
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const uploadImage = await bookController.uploadImage(req.file)
        if (uploadImage.success) {
            const createdAuthor = await bookController.createBook({...newAuthor, picture: uploadImage.data});
            res.status(201).json(createdAuthor);
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});



router.post('/toggle_book', async (req, res) => {
    try {
        const data = await bookController.toggleBook(req.body.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({message: e.message, success: false})
    }
})


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;
    try {
        const data = await bookController.updateBook(id, updatedData)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const data = await bookController.deleteBook(id)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = router;
