import { Router } from "express";
import { AdminSigninSchema, AdminSignupSchema } from "../types";
import { prismaClient } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMIN_JWT } from "../config";
const router = Router();

router.post("/signup",async(req,res)=>{
    try {
        const parsedBody = AdminSignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Incorrect Inputs!",Error:parsedBody.error.errors})
        }
        const {admName,admImg,admUserName,admPassword,UserRole} = parsedBody.data;
        const existingUser = await prismaClient.admin.findFirst({
            where:{
                admUserName,
            }
        });
        if (existingUser) {
            return res.status(402).json({message:"Admin Already exist!"})
        }
        const hashPassword = await bcrypt.hash(admPassword,10);

        const createUser = await prismaClient.admin.create({
            data:{
                admName,
                admImg,
                admUserName,
                admPassword:hashPassword,
                UserRole
            }
        });
        res.status(200).json({
            message:"Admin Created Successfully!",
            user:createUser
        });

    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went Wrong!",error})
    }
});

router.post("/signin",async(req,res)=>{
    try {
        const parsedBody = AdminSigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Incorrect Inputs!",Error:parsedBody.error.errors})
        }
        const {admUserName,admPassword,} = parsedBody.data;
        const admin = await prismaClient.admin.findFirst({
            where:{
                admUserName
            }
        });
        if (!admin) {
            return res.status(404).json({message:"Admin not found!"});
        }
        const checkPassword = await bcrypt.compare(admPassword,admin.admPassword);
        if (!checkPassword) {
            return res.status(401).json({
            message:"Password Didn't Match!",
            });
        };
        const token = jwt.sign({
            admin:admin.id
        },ADMIN_JWT as string,{expiresIn:"1d"});
        res.status(200).json({
            message:"Admin Signed In Successfully!",
            admin:admin,
            token:token
        });
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something went Wrong!",error})
    }
});

export const adminRouter = router;