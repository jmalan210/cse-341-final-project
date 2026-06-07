const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validate = require('../helpers/validateBook');
//needs validation and authentication

router.get('/', booksController.getAllBooks);
router.get('/:id', validate.checkId, booksController.getBookById);

router.post('/', validate.saveBook, booksController.createBook);
router.put('/:id', validate.checkId, validate.updateBook, booksController.updateBook);
router.delete('/:id', validate.checkId, booksController.deleteBook);

module.exports = router;