const { body, param, validationResult } = require('express-validator');
const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Adventure", "Dystopian", "Young Adult", "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "History", "Self-Help", "Philosophy", "Science", "Politics", "Religion", "True Crime", "Education", "Other" ]

const saveUser = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Valid email required'),
    body('role').notEmpty().isIn(['admin', 'user']).withMessage('Role must be admin or user'),
    body('favoriteGenre').optional().isIn(genres).withMessage('Favorite genre must be an acceptable genre'),
    body('displayName').notEmpty().withMessage('Display name is required'),

    

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const updateUser = saveUser;

const checkId = [
    param('id').isMongoId().withMessage('Invalid user ID'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    saveUser, 
    updateUser,
    checkId
}