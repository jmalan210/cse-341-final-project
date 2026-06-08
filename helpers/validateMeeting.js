const { body, param, validationResult } = require('express-validator');

const saveMeeting = [
    body('date').notEmpty().withMessage('Date is required').isDate().withMessage('Date must be a valid date: YYYY-MM-DD'),
    body('location').notEmpty().withMessage('Location required'),
    body('host').notEmpty().withMessage('Host is required').isMongoId().withMessage('Host must be a valid MongoDB ID'),
    body('book').isMongoId().withMessage('Book must be a valid MongoDB ID'),
    

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const updateMeeting = saveMeeting;

const checkId = [
    param('id').isMongoId().withMessage('Invalid meeting ID'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMonthYear = [
    
    param('month')
        .isInt({ min: 1, max: 12 })
        .withMessage('Month must be 1-12'),
    
    param('year')
        .isInt({ min: 1900, max: 2100 })
        .withMessage('Year must be a valid year'),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    saveMeeting, 
    updateMeeting,
    checkId,
    validateMonthYear

}


