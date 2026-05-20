import pool from '../config/database.js';

const sqlFindUserByLogin = 'SELECT id, login, password, id_user, id_role, id_avatar, created_at, updated_at FROM authorizations WHERE login = $1';
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
};

export const registrateUser = async(data, hash) => {
    try{
        let result;
        if(data.fatherName){
            result = await pool.query(sqlRegistretedUser, [data.firstName, data.secondName, data.fatherName, data.dateOfBirth]);
        } else {
            result = await pool.query(sqlRegistretedUserWithoutFatherName, [data.firstName, data.secondName, data.dateOfBirth]);
        }
        if(result.rowCount <= 0){
            const err = new Error('User Registration Failed');
            err.status = 500;
            throw err;
        }

        const userId = result.rows[0].id;
        const idRole = data.id_role || 1; // Значение по умолчанию
        await pool.query(sqlAuthorization, [data.login, hash, userId, idRole]);

        return {
            id: userId,
            login: data.login,
            id_user: userId,
            id_role: idRole,
            id_avatar: null,
            created_at: new Date(),
            updated_at: new Date()
        };
    } catch(err){
        console.log(err);
        throw err;
    }
};