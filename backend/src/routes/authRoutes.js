const express =require('express');
const router = express.Router();
const authController = require('./authController');
const { validateRegistration, validateLogin } = require('./authValidation');

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);


module.exports = router;