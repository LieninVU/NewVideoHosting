import { body } from 'express-validator';

export const validateRegistration = [
    body('firstName').notEmpty().isLength({max: 200}),
    body('secondName').notEmpty().isLength({max: 200}),
    body('fatherName').optional().isLength({max: 200}),
    body('dateOfBirth').notEmpty().isDate(),
    body('login').notEmpty().isLength(200).isEmail(),
    body('password').notEmpty().isLength({min: 6, max: 250}),
    body('id_role').optional().isInt().default(1)
];

export const validateLogin = [
    body('login').notEmpty().isLength(200).isEmail(),
    body('password').notEmpty().isLength({min: 6, max: 250})
];