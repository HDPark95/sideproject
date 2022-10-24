const {Router} = require('express');
const {User} = require("../models/Users");
const userRouter = Router();

/**
 * @swagger
 * paths:
 *  /user/login:
 *    post:
 *      summary: "로그인"
 *      description: "로그인"
 *      tags: [Users]
 *      requestBody:
 *          description: 로그인
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 *                        description: "유저 고유아이디"
 *                      password:
 *                        type: string
 *                        description: "패스워드"
 *      responses:
 *        "200":
 *          description: 로그인
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    success:
 *                      type: boolean
 */
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

/**
 * @swagger
 * paths:
 *  /user:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    success:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */

userRouter.get("/", async function(req, res){
    try{
        const users = await User.find();
        return res.send({success:true, users:users});
    }catch (e) {
        console.log(e);
        res.status(500).send({error:e.message, success:false })
    }
})
/**
 * @swagger
 * paths:
 *  /user:
 *    post:
 *      summary: "회원가입"
 *      description: "회원가입"
 *      tags: [Users]
 *      requestBody:
 *          description: 유저 수정
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 *                        description: "유저 고유아이디"
 *                      name:
 *                        type: object
 *                        description: "유저 이름"
 *                        properties:
 *                          firstname:
 *                            type: string
 *                            description: "이름"
 *                          lastname:
 *                            type: string
 *                            description: "성"
 *                      age:
 *                        type: int
 *                        description: "나이"
 *                      email:
 *                        type: string
 *                        description: "이메일"
 *                      password:
 *                        type: string
 *                        description : "패스워드"
 *      responses:
 *        "200":
 *          description: 회원가입
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    success:
 *                      type: boolean
 */
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
