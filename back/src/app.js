const express = require('express');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
const path = require("path");
const cors = require('cors');
require('dotenv').config({path: path.join(__dirname, '../config/.env')});


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/authors', authorsRoutes);
app.use('/api/books', booksRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});