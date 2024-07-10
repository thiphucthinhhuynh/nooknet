const { check, validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.path] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};

// --------------------------------------------------------------------------------------//
//            Middleware for validating the body of request in the Item routes          //
// ------------------------------------------------------------------------------------//
const validateItem = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a name.'),
    check('description').optional(),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a price.')
        .bail() // Bail if price is not provided
        .isFloat({ min: 0 })
        .withMessage('Price cannot be negative.'),
    check('quantity')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a quantity.')
        .bail() // Bail if quantity is not provided
        .isInt()
        .withMessage('Please enter an integer for quantity.')
        .bail() // Bail if quantity is not an integer
        .isInt({ min: 0 })
        .withMessage('Quantity cannot be negative.'),
    check('category')
        .exists({ checkFalsy: true })
        .withMessage('Please select a category.'),
    handleValidationErrors
];

module.exports = { handleValidationErrors, validateItem };
