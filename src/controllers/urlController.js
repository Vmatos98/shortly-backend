import { nanoid } from 'nanoid' 

import db from "../db.js";

export async function shortUrl(req, res) {
    const { url } = req.body;
    console.log(url);
    try {
        
        const shortUrl = nanoid(10);
        console.log(shortUrl, res.locals);
        const result = await db.query(
        `INSERT INTO urls
        ("url", "shortUrl", "userId")
        VALUES ($1, $2, $3)
        RETURNING *`,
        [url, shortUrl, res.locals]
        );
        if (result.rows.length > 0) {
        res.status(201).send({"shortUrl": result.rows[0].shortUrl});
        } else {
        res.status(400).send("Invalid url");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}