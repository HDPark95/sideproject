const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {User} = require('./src/models/Users')
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {userRouter} = require('./src/routes/userRoute');
const swaggerFile  = require('./src/swagger/swagger-output.json');


const MONGO_URI = 'mongodb+srv://root:1q2w3e4r@cluster0.dtevs03.mongodb.net/SideProject?retryWrites=true&w=majority';

const server = async () =>{
    try{
        await mongoose.connect(MONGO_URI);
        app.use(express.json());
        mongoose.set('debug', true);

        //Swagger
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

        app.use('/user', userRouter);

        app.listen(3000, function(){
            console.log("server start")
        });
    }catch (e) {
        console.log(e)
    }
}

server();
