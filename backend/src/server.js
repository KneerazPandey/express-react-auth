import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './db/connection.js';
import router from './routes/routers.js';

const app = express();

//* Reading data from .env
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;


//* Middleware
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/v1', router);


const server = async () => {
    try {
        connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listning at http://localhost:${PORT}`);
        });
    }catch(error) {
        console.log('Failed to start the server. ', error.message);
    }
}

server();
