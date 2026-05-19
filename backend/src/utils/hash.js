const bcrypt = require('bcrypt');



exports.hashPassword = async (password) => {
    try{
        const hash = await bcrypt.hasd(password, Number(process.env.SALT_ROUNDS));
        return hash;
    } catch(err){
        throw err;
    }
}


exports.comparePassword = async(password, hash) => {
    try{
        return await bcrypt.compare(password, hash);
    } catch(err){
        throw err;
    }
}





