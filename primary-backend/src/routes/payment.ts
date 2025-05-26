import { Router } from "express";
import { prismaClient } from "../db/db";
import jwt from "jsonwebtoken";
import { USER_JWT } from "../config";
import { userAuthenticate } from "../middleware/middleware";
const router = Router();

router.post("/buycourse/:id",userAuthenticate,async(req,res)=>{
    try {
        const courseId = req.params.id;
        const {stuId} = req.body
        const checkCourse = await prismaClient.course.findFirst({
            where:{
                id:courseId
            }
        })
        if(!checkCourse) return res.status(404).json({message:"Course Not Found!"});
        const buyCourse = await prismaClient.course.update({
            where:{
                id:courseId,
            },data:{
                students:stuId
            }
        });
        if (!buyCourse) return res.json(401).json({message:"Unable to buy course right now | try again later!"});
        const token = await jwt.sign({
            purchaseToken:checkCourse.id
        },USER_JWT)
        res.json({
            message:"Course Purchased Successfully!",
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});
export const paymentRouter = router;