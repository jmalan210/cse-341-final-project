const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Final Project',
        description: 'Final Project for CSE 341'
    },
    host: "localhost:3000",
    schemes: ['http'],
    
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './server.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        require('./server');
    });