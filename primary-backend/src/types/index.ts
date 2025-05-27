import { UserRole } from "@prisma/client";
import { z } from "zod";

export const StudentSignupSchema = z.object({
    stuName:z.string(),
    stuUserName: z.string().email(), 
    stuPassword:z.string().min(8).max(30),
    UserRole:z.nativeEnum(UserRole)
});
export const StudentSigninSchema = z.object({
    stuUserName: z.string(), 
    stuPassword:z.string().min(8).max(16), 
});

export const AdminSignupSchema = z.object({
    admName:z.string(),
    admImg:z.string(),
    admUserName: z.string(), 
    admPassword:z.string().min(8).max(16), 
    UserRole:z.nativeEnum(UserRole),
});
export const AdminSigninSchema = z.object({
    admUserName: z.string(), 
    admPassword:z.string().min(8).max(16), 
});