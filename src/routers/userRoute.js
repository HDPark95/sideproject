const {Router} = require('express');
const {User} = require("../models/Users");
const userRouter = Router();

userRouter.post("/login", async function(req, res){
    try{
        const username = req.body.username;
        const password = req.body.password;
        if(typeof username != "string", typeof password != "string"){
            res.status(400).send({message:"login failed", success:false})
        }
        User.findOne({ username: username, password: password }).exec((err, result) => {
            if(result){
                res.status(200).send({success:true});
            } else {
                res.status(400).send({message:"login failed", success:false})
            }
        });
    }catch (e) {
        console.log(e);
        res.status(500).send({error:e.message, success:false })
    }
})
userRouter.get("/", async function(req, res){
    try{
        const user = await User.find();
        return res.send({user});
    }catch (e) {
        console.log(e);
        res.status(500).send({error:e.message, success:false })
    }
})
userRouter.post("/", async function(req,res){
    try{
        const user = new User(req.body);
        await user.save();
        res.send({success:true})
    }catch (e) {
        console.log(e);
        res.status(500).send({error:e.message, success:false })
    }
});

module.exports={
    userRouter
}
