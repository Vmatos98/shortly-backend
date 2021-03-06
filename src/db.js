import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;
dotenv.config();

// const user = process.env.user;
// const password = process.env.password;
// const host = process.env.host;
// const port = process.env.port;
// const database = process.env.database;
// const db = new Pool({
//     user,
//     password,
//     host,
//     port,
//     database
// });

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);

export default db;