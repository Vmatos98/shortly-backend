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

export async function getUrl(req, res) {
    const { id } = req.params;
    try {
        const result = await db.query(
        `SELECT * FROM urls WHERE id = $1`,
        [id]
        );
        if (result.rows.length > 0) {
        const objResult = {
            "id": result.rows[0].id,
            "shortUrl": result.rows[0].shortUrl,
            "url": result.rows[0].url,
        }
        res.send(objResult).status(200);
        
        } else {
        res.status(404).send("url not found");
        }
    }catch (error) {
        res.status(500).send(error.detail);
    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const result = await db.query(
        `UPDATE urls SET "visitCount" = "visitCount"+1 WHERE "shortUrl" = $1 RETURNING *`,
        [shortUrl]
        );
        if (result.rows.length > 0) {
            res.redirect(result.rows[0].url);
        } else {
            res.status(404).send("url not found");
        }
    }catch (error) {
        res.status(500).send(error.detail);
    }
}