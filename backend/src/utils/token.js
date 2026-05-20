import jwt from 'jsonwebtoken';

export const generateToken = (id, login) => {
    try {
        const token = jwt.sign({ id: id, login: login }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    } catch(err){
        console.log(err);
        throw err;
    }
};