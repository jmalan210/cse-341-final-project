const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
        );
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        next();
    });
app.use('/', require('./routes/index.js'));


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
        
    })
    .catch((err) => {
        console.error(err);
    });