const {registerUser, loginUser} = require('./authService');
const { validateRegistration, validateLogin } = require('./authValidation');   

exports.register = async(req,res, next) => {
    try{
        const err = validateRegistration(req.body);
        if(!err.isEmpty()){
            return res.status(400).json({ error: err.array()});
        }

        const userData =req.body;
        const tokenData = await registerUser(req.body);
        res.status(201).json(tokenData);
    } catch(err){
        console.log(err);
        next(err);
    }
}


exports.login = async(req, res, next) => {
    try{
        const err = validateLogin(req.body);
        if(!err.isEmpty()){
            return res.status(400).json({ error: err.array()});
        }
        const {login, password} = req.body;
        const tokenData = await loginUser(login.body);
        res.json(tokenData);
    } catch(err){
        console.log(err);
        next(err);
    }
}

exports.logout = (req, res) => {
    res.json({message: 'logout success'});
}
