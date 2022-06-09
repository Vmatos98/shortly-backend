import db from "../db.js";

import { urlSchema } from "./joiSchemas.js";
export async function shortUrlRules(req, res, next){
    const { authorization } = req.headers;
    if(!authorization){
        res.status(401).send('Unauthorized');
    }
    const token = authorization.replace('Bearer ', '');
    try{
        const {url}= req.body;
        const {error}= urlSchema.validate(req.body);
        if(error){
            return res.status(422).send(error.details[0].message);
        }
        const user = await db.query(`SELECT * FROM tokens WHERE token = $1`, [token]);
        if(user.rows.length > 0 && user.rows[0].isValid === true){
            res.locals = user.rows[0].userId;
        }else{
            res.status(422).send('token is not valid');
        }
    }catch (error) {
        res.status(500).send(error.detail);
    }
    next();
}

export async function deleteUrlsRules(req, res, next){
    const { authorization } = req.headers;
    if(!authorization){
        res.status(401).send('Unauthorized');
    }
    const token = authorization.replace('Bearer ', '');
    try{
        const user = await db.query(`SELECT * FROM tokens WHERE token = $1`, [token]);
        if(user.rows.length > 0 && user.rows[0].isValid === true){
            res.locals = user.rows[0].userId;
        }else{
            res.status(422).send('token is not valid');
        }
    }catch (error) {
        res.status(500).send(error.detail);
    }
    next();
}