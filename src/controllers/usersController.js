import colors from 'colors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from './../db.js';

export async function addNewUser(req, res) {
    try {
        
        const { name, email, password } = req.body;
        const newPassword = await bcrypt.hash(password, 10);
        const result = await db.query(`INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [name, email, newPassword]);
        if(result.rows.length > 0) {
        res.status(201).send('User created successfully');
        }else{
            res.status(400).send(result.detail);
        }
                
            
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;     
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(result.rows.length > 0 && bcrypt.compareSync(password, result.rows[0].password)) {
            const token = uuid();
            await db.query(`UPDATE tokens SET "isValid" = false WHERE "userId" = $1 AND "isValid" = true`, [result.rows[0].id]);
            await db.query(`INSERT INTO tokens ("token", "userId") VALUES ($1, $2)`, [token, result.rows[0].id]);
            res.status(200).send(token);
        }else{
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).json(error.detail);
    }
}

export async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await db.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS amount 
        FROM users 
        JOIN urls 
        ON urls."userId" = users.id
        WHERE users.id = ${id}
        GROUP BY users.id`);
        if(user.rows.length === 0) {
            return res.status(200).send({
                "id" :res.locals.id,
                "name": res.locals.name,
                "visitCount": 0,
                "shortenedUrls":[]
            });
        }
        const data = await db.query(`SELECT id, url, "shortUrl", "visitCount"
        FROM urls
        WHERE "userId" = ${id}`);
        const result = {
            "id": user.rows[0].id,
            "name": user.rows[0].name,
            "visitCount": user.rows[0].amount,
            "shortenedUrls": data.rows
        }
            res.status(200).send(result);
        
    } catch (error) {
        res.status(500).send(error);
    }
}