import { Router } from "express";
import { prismaClient } from "../db/db";
import { adminAuthenticate } from "../middleware/middleware";

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

router.put("",async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went wrong!"})
        
    }
});

export const courseRouter = router;