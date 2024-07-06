import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8000;

//* Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const server = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listning at http://localhost:${PORT}`);
        });
    }catch(error) {
        console.log('Failed to start the server. ', error.message);
    }
}

server();
