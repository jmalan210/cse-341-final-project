const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
     //#swagger.tags = ['Books'] 
    try {
        const books = await Book.find()
            
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getBookById = async (req, res) => {
    //#swagger.tags = ['Books']
    
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ messages: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });

    }
    
};


const createBook = async (req, res) => {
     //#swagger.tags = ['Books'] 
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            genre: req.body.genre,
            status: req.body.status
        }
        const book = await Book.create(newBook);
        res.status(201).json(book)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags = ['Books']
    
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            genre: req.body.genre,
            status: req.body.status
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, book);
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(201).json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags = ['Books']
    
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook

}