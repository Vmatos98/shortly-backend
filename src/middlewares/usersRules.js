import colors from 'colors';

import db from './../db.js';
import { signupSchema, loginSchema } from './joiSchemas.js';


export async function addNewUserRules(req, res, next) {
    try {
        const { error } = signupSchema.validate(req.body);
        if(error) {
            return res.status(422).send(error.details[0].message);
        }
        const {email} = req.body;
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(user.rows.length > 0) {
            res.status(422).send('email already exists');
            
        }else{
            next();
        }
    } catch (error) {
        res.status(500).send(error.detail);
    }
}
export async function userLoginRules(req, res, next) {
    try {
        const { error } = loginSchema.validate(req.body);
        if(error) {
            res.status(422).send(error.details[0].message);
        }else{
            next();
        }
    } catch (error) {
        res.status(500).send(error.detail);
    }
}

export async function getUserRules(req, res, next) {
    const { authorization } = req.headers;
    if(!authorization){
        res.status(401).send('Unauthorized');
    }
    const token = authorization.replace('Bearer ', '');
    try{
        const { id } = req.params;
        const userToken = await db.query(`SELECT * FROM tokens WHERE token = $1`, [token]);
        if(userToken.rows.length === 0 || userToken.rows[0].isValid === false){
            res.status(401).send('token is not valid');
            
        }
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if(user.rows.length > 0){
            res.locals = user.rows[0];
        }else{
            res.status(404).send('user not found');
        }
    }catch (error) {
        res.status(500).send(error.detail);
    }
    next();
}