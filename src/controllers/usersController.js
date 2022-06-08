import colors from 'colors';

import db from './../db.js';

export async function addNewUser(req, res) {
    try {
        
        const { name, email, password } = req.body;
        const result = await db.query(`INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [name, email, password]);
        if(result.rows.length > 0) {
        res.status(201).send('User created successfully');
        }else{
            res.status(400).send(result.detail);
        }
                
            
    } catch (error) {
        res.status(500).json(error.detail);
    }
}