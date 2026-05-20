import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try{
        const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        return hash;
    } catch(err){
        throw err;
    }
};

export const comparePassword = async(password, hash) => {
    try{
        return await bcrypt.compare(password, hash);
    } catch(err){
        throw err;
    }
};