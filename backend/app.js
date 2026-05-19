const express = require('express');
import { corsComfig } from './config/cors.js';
import pool from './config/database.js';
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(corsConfig);
app.use(morgan('dev'));
app.use(express.json());




app.get('/', (req,res) =>{
    res.send('<h1>Hello World</h1>');
})




app.listen(3000);