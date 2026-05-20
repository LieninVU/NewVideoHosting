import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const corsConfig = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

export default cors(corsConfig);