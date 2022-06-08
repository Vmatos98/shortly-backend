import express from 'express';  
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import usersRouter from './routes/userRouter.js';

const app = express().use(express.json()).use(cors());
app.use(usersRouter);

app.listen(process.env.PORT, () => {
    console.log("Server running on port: ".blue.bgBrightGreen + (process.env.PORT).toString().yellow.bgBrightGreen);
}); 

