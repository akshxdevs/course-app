import { Router } from "express";
import { prismaClient } from "../db/db";
import { adminAuthenticate, userAuthenticate } from "../middleware/middleware";
import jwt from "jsonwebtoken"
import { USER_JWT } from "../config";
const router = Router();

router.get("/getallcourses",async(req,res)=>{
    try {
        const getAllCourse = await prismaClient.course.findMany({
        });
        if (!getAllCourse) {
            return res.status(404).json("No Courses Found!")
        }
        res.json({
            message:"All Courses fetched Sucessfully!!",
            courses:getAllCourse
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});

router.get("/getcourses/:id",async(req,res)=>{
    try {
        const id = req.params.id; 
        const getCourse = await prismaClient.course.findFirst({
            where:{
                id
            }
        });
        if (!getCourse) {
            return res.status(404).json("No Courses Found!")
        }
        res.json({
            message:"Course fetched Sucessfully!!",
            courses:getCourse
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});

router.post("/publishcourse/:id",adminAuthenticate,async(req,res)=>{
    try {
        const tutorId = req.params.id
        const {  
            courseName,
            courseImg, 
            courseDescription,
            courseRating,
            hoursOfcontent,
            practicalExcercise,
            CoursePrice,
        } = req.body
        const publishCourse = await prismaClient.course.create({
            data:{
            courseName,
            courseImg, 
            courseDescription,
            courseRating,
            hoursOfcontent,
            practicalExcercise,
            CoursePrice,
            tutorId:tutorId
            }
        })
        if (!publishCourse) {
            return res.status(404).json("Error While Publishing Course!")
        }
        await prismaClient.course.update({
            where:{
                id:publishCourse.id
            },data:{
                enrolledCount:{
                    increment:1
                }
            }
        })
        res.json({
            message:"Course Published Successfully!",
            course:publishCourse
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});

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
                students:{
                    connect:{
                        id:stuId
                    }
                }
            }
        });
        if (!buyCourse) return res.json(401).json({message:"Unable to buy course right now | try again later!"});
        const token = await jwt.sign({
            courseId:checkCourse.id,
            courseName:checkCourse.courseName,
            buyerId:stuId,
        },USER_JWT)
        await prismaClient.purchaseToken.create({
            data:{
                stuId:stuId,
                purchaseToken:token
            }
        })
        res.json({
            message:"Course Purchased Successfully!",
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});


router.post("/addtowishlist/:id",adminAuthenticate,async(req,res)=>{
    try {
        const courseId = req.params.id
        const {  
            courseName,
            courseImg,
            courseDescription,
            courseRating,
            hoursOfcontent,
            CoursePrice,
            stuId,
        } = req.body
        const wishlistedCourse = await prismaClient.wishlist.create({
            data:{
            courseId,
            courseName,
            courseImg, 
            courseDescription,
            courseRating,
            hoursOfcontent,
            CoursePrice,
            stuId:stuId
            }
        })
        if (!wishlistedCourse) {
            return res.status(404).json("Error While Publishing Course!")
        }
        res.json({
            message:"Course Added To Wishlist Successfully!",
            course:wishlistedCourse
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});

router.put("",async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});

export const courseRouter = router;