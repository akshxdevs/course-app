import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { ADMIN_JWT, USER_JWT } from "../config";

interface AuthRequest extends Request {
    id?:string
}
export async function userAuthenticate(req:AuthRequest,res:Response,next:NextFunction) {
    try {
        const token = req.headers["authorization"] as unknown as string;
        if (!token) return res.status(403).json({message:"No Token Provided!"})
        const payload = jwt.verify(token,USER_JWT as string) as {id:string};
        req.id = payload.id;
        console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something Went Wrong!"})
    }
}

export async function adminAuthenticate(req:AuthRequest,res:Response,next:NextFunction) {
    try {
        const token = req.headers["authorization"] as unknown as string;
        if (!token) return res.status(403).json({message:"No Token Provided!"});
        console.log(token);
        const payload = jwt.verify(token,ADMIN_JWT as string) as {id:string};
        req.id = payload.id;
        console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        res.status(411).json({message:"Something Went Wrong!"})
    }
}