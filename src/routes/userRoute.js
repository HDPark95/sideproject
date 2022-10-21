const {Router} = require('express');
const {User} = require("../models/Users");
const userRouter = Router();

/* GET sign in page. */
/**
 * @swagger
 * paths:
 *  /user:
 *   get:
 *     tags: [전체 회원 조회]
 *     summary: 전체 회원 조회
 *     responses:
 *       "200":
 *         description: 유저 목록 조회
 *
 *
 */
userRouter.get("/:userId", async function(req, res){
    try{
        const {userId} = req.params;

        const user = await User.findOne({_id: userId});
        return res.send({user});
    }catch (e) {
        console.log(e);
        res.status(500).send({error:e.message, success:false })
    }
})
/* GET sign in page. */
/**
 * @swagger
 * paths:
 *  /users:
 *   post:
 *     tags: [SignUp]
 *     summary: 사용자 등록 유저 처리
 *     type: "object"
 *     parameters:
 *       -name: "name"
 *          type: "string"
 *          in : "body"
 *          description: 로그인 정보(아이디)
 *
 *     responses:
 *       "200":
 *         discription: 사용자 등록
 *         content:
 *           application:json
 *       "400":
 *         discription: 잘못된 파라메타 전달
 *
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
