const { pool } = require('./dvConfig');


const sqlFindUserByLogin = 'SELECT login, id_user, id_role, id_avatar, created_at, updated_at FROM authorizations WHERE login = $1';
const sqlRegistretedUser = 'INSERT INTO users (first_name, second_name, father_name, date_of_birth) VALUES($1, $2, $3, $4) RETURNING id';
const sqlRegistretedUserWithoutFatherName = 'INSERT INTO users (first_name, second_name, date_of_birth) VALUES($1, $2, $3) RETURNING id';
const sqlAuthorization = 'INSERT INTO authorizations (login, password, id_user, id_role) VALUES($1, $2, $3, $4)';
const sqlIsAuthorizated = 'SELECT * FROM authorizations WHERE login = $1';

export const findByLogin = async (login) => {
    try{
        const result = await pool.query(sqlFindUserByLogin, [login]);
        return result.rowCount ? result.rows[0] : null;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export const registrateUser = async(data, hash) => {
    try{
        let result;
        if(data.fatherName)
                result = await pool.query(sqlRegistretedUser, [data.firstName, data.secondName, data.fatherName, data.dateOfBirth])
                .catch(err => {throw err});
        else
            result = await pool.query(sqlRegistretedUserWithoutFatherName, [data.firstName, data.secondName, data.dateOfBirth])
            .catch(err => {throw err});
        if(result.rowCount <= 0){
            const err = new Error('User Registration Failed');
            err.status = 500;
            throw err;
        }

        const newUser =  pool.query(sqlAuthorization, [data.login, hash, result.rows[0].id, data.id_role])
                .then(newUser => result.rows[0])
                .catch(err => {throw err});
        
        return {
            login: newUser.login,
            id_user: newUser.id_user,
            id_role: newUser.id_role,
            id_avatar: newUser.id_avatar ? newUser.id_avatar : null,
            created_at: newUser.created_at,
            updated_at: newUser.updated_at
        }

    } catch(err){
        console.log(err);
        throw err;
    }
}