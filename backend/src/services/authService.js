
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { validateRegistration, validateLogin } = require('../validators/authValidator');
const { hashPassword, comparePassword } = require('../utils/hash');
const userRepository = require('../models/userRepository');
const { generateToken } = require('../utils/token');


async function registerUser(data) {
    try {
        if (await userRepository.findByLogin(data.login)) {
            const err = new Error('User With Such a Login Already Present');
            err.status = 409;
            throw err;
        }

        const passwordHash = await hashPassword(data.password);
        await userRepository.registrateUser(data, passwordHash);
        return await loginUser(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


async function loginUser(data) {
    try {
        const result = await userRepository.findByLogin(data.login);
        if (!result) {
            const err = new Error('Wrong Data');
            err.status = 401;
            throw err;
        }

        if (!await comparePassword(data.password, result.password)) {
            const err = new Error('Wrong Data');
            err.status = 401;
            throw err;
        }

        const token = generateToken(result.id, result.login);
        return {
            token,
            user: { login: result.login, id_user: result.id_user, id_role: result.id_role, id_avatar: result.id_avatar }
        };
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}

module.exports = { registerUser, loginUser };