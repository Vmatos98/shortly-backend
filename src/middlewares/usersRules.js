import colors from 'colors';

import db from './../db.js';
import { signupSchema } from './joiSchemas.js';


export async function addNewUserRules(req, res, next) {
    try {
        const { error } = signupSchema.validate(req.body);
        if(error) {
            res.status(422).send(error.details[0].message);
        }else{
            next();
        }
    } catch (error) {
        res.status(500).send(error.detail);
    }
}