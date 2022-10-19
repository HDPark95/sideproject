const express = require('express')
const app = express();
const mongoose = require('mongoose')

const users = [];
const MONGO_URI = 'mongodb+srv://root:1q2w3e4r@cluster0.dtevs03.mongodb.net/?retryWrites=true&w=majority';
const server = async () =>{
    try{
        let mongodbConnection = await mongoose.connect(MONGO_URI).then(result => console.log({result}));

        app.use(express.json());

        app.get("/user", function(req, res){
            res.send({users: users});
        })
        app.post("", function(req,res){
            res.send({success:true})
        });
        app.listen(3000, function(){
            console.log("server start")
        });
    }catch (e) {
        console.log(e)
    }
}

server();