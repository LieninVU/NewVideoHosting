import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../validators/authValidator.js';

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

export default router;