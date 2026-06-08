const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validate = require('../helpers/validateBook');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', booksController.getAllBooks);
router.get('/:id', validate.checkId, booksController.getBookById);

router.post('/', isAuthenticated, validate.saveBook, booksController.createBook);
router.put('/:id', isAuthenticated,validate.checkId, validate.updateBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, validate.checkId, booksController.deleteBook);

module.exports = router;