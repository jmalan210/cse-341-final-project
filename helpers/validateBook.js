const { body, param, validationResult } = require('express-validator');

const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Adventure", "Dystopian", "Young Adult", "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "History", "Self-Help", "Philosophy", "Science", "Politics", "Religion", "True Crime", "Education", "Other" ]

const saveBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('category').notEmpty().isIn(['fiction', 'nonfiction']).withMessage('Must be either fiction or nonfiction'),
    body('genre').notEmpty().isIn(genres).withMessage('Genre must be an acceptable genre'),
    body('status').notEmpty().isIn(['assigned', 'unassigned', 'read']).withMessage('Must be either assigned, unassigned, or read'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const updateBook = saveBook;

const checkId = [
    param('id').isMongoId().withMessage('Invalid book ID'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    saveBook,
    updateBook,
    checkId
}