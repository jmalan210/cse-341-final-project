const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Final Project',
        description: 'Final Project for CSE 341'
    },
    host: "cse-341-final-project-tqxt.onrender.com",
    schemes: ['https'],
    
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './app.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        require('./server');
    });