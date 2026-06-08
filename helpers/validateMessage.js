const { body, param, validationResult } = require('express-validator');

const saveMessage = [
    body('user').isMongoId().withMessage('user must be a valid MongoDB ID'),
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Content is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
        
];

const updateMessage = saveMessage;

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

const validateDisplayName = [
    param('displayName')
        .notEmpty()
        .withMessage('Display name is required')
        .trim()
        .escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array });
        }
        next()
    }
]
module.exports = {
    saveMessage, 
    updateMessage,
    checkId,
    validateDisplayName
}