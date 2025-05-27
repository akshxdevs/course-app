import { Router } from "express";
import { prismaClient } from "../db/db";
import { StudentSigninSchema, StudentSignupSchema } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_JWT } from "../config";

const router = Router();

router.post("/signup",async(req,res)=>{
    try {
        const parsedBody = StudentSignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Incorrect Inputs!",Error:parsedBody.error.errors})
        }
        const {stuName,stuUserName,stuPassword,UserRole} = parsedBody.data;
        const existingUser = await prismaClient.student.findFirst({
            where:{
                stuUserName,
            }
        });
        if (existingUser) {
            return res.status(402).json({message:"User Already exist!"})
        }
        const hashPassword = await bcrypt.hash(stuPassword,10);

        const createUser = await prismaClient.student.create({
            data:{
                stuName,
                stuUserName,
                stuPassword:hashPassword,
                UserRole:"STUDENT",
            }
        });
        res.status(200).json({
            message:"User Created Successfully!",
            user:createUser
        });

    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went Wrong!",error})
    }
});

router.post("/signin",async(req,res)=>{
    try {
        const parsedBody = StudentSigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Incorrect Inputs!",Error:parsedBody.error.errors})
        }
        const {stuUserName,stuPassword,} = parsedBody.data;
        const user = await prismaClient.student.findFirst({
            where:{
                stuUserName
            }
        });
        if (!user) {
            return res.status(404).json({message:"User not found!"});
        }
        const checkPassword = await bcrypt.compare(stuPassword,user.stuPassword);
        if (!checkPassword) {
            return res.status(401).json({
            message:"Password Didn't Match!",
            });
        };
        const token = jwt.sign({
            user:user.id
        },USER_JWT as string,{expiresIn:"1d"});
        res.status(200).json({
            message:"User Signed In Successfully!",
            user:user,
            token:token
        });

    } catch (error) {
        res.status(411).json({message:"Something went Wrong!",error})
    }
});

router.post("/login/otp",(req,res)=>{
    try {
        
    } catch (error) {
        
    }
});

router.post("/login/generateotp",(req,res)=>{
    try {
        
    } catch (error) {
        
    }
});

router.post("/login/check-otp",(req,res)=>{
    try {
        
    } catch (error) {
        
    }
});

export const userRouter = router;