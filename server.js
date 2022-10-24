const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {User} = require('./src/models/Users')
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const {userRouter} = require('./src/routers/userRoute');
const { swaggerUi, specs } = require("./src/swagger/swagger")
const YAML = require('yamljs');
const path = require('path');

const MONGO_URI = 'mongodb+srv://root:1q2w3e4r@cluster0.dtevs03.mongodb.net/SideProject?retryWrites=true&w=majority';

const server = async () =>{
    try{
        await mongoose.connect(MONGO_URI);
        app.use(express.json());
        mongoose.set('debug', true);

        app.use('/user', userRouter);
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
        app.listen(3000, function(){
            console.log("server start")
        });
    }catch (e) {
        console.log(e)
    }
}

server();
