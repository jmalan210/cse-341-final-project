const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app')

const PORT = process.env.PORT || 3000;

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