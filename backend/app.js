import express from 'express';
import corsConfig from './src/config/cors.js';
import pool from './src/config/database.js';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(helmet());
app.use(corsConfig);
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});