const { body } = require('express-validator');

exports.validateRegistration = [
    body('first_name').notEmpty().isLength({max: 200}),
    body('second_name').notEmpty().isLength({max: 200}),
    body('father_name').optional().isLength({max: 200}),
    body('date_of_birth').notEmpty().isDate(),
    body('login').notEmpty().isLength(200).isEmail(),
    body('password').notEmpty().isLength({min: 6, max: 250}),
    body('id_avatar').optional().isInt()
]

exports.validateLogin = [
    body('login').notEmpty().isLength(200).isEmail(),
    body('password').notEmpty().isLength({min: 6, max: 250})
]