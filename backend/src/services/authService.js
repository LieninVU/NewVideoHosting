import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { hashPassword, comparePassword } from '../utils/hash.js';
import { findByLogin, registrateUser } from '../models/userRepository.js';
import { generateToken } from '../utils/token.js';

async function registerUser(data) {
    try {
        if (await findByLogin(data.login)) {
            const err = new Error('User With Such a Login Already Present');
            err.status = 409;
            throw err;
        }

        const passwordHash = await hashPassword(data.password);
        const result = await registrateUser(data, passwordHash);
        const token = generateToken(result.id, result.login);
        return {
            token,
            user: { login: result.login, id_user: result.id_user, id_role: result.id_role, id_avatar: result.id_avatar }
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function loginUser(data) {
    try {
        const result = await findByLogin(data.login);
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
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export { registerUser, loginUser };