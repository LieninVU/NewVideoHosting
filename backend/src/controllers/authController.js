import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res, next) => {
    try{
        const tokenData = await registerUser(req.body);
        res.status(201).json(tokenData);
    } catch(err){
        console.log(err);
        next(err);
    }
};

export const login = async (req, res, next) => {
    try{
        const tokenData = await loginUser(req.body);
        res.json(tokenData);
    } catch(err){
        console.log(err);
        next(err);
    }
};

export const logout = (req, res) => {
    res.json({message: 'logout success'});
};