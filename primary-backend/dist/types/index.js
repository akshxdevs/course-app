"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSigninSchema = exports.AdminSignupSchema = exports.StudentSigninSchema = exports.StudentSignupSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.StudentSignupSchema = zod_1.z.object({
    stuName: zod_1.z.string(),
    stuImg: zod_1.z.string(),
    stuUserName: zod_1.z.string().email(),
    stuPassword: zod_1.z.string().min(8).max(30),
    UserRole: zod_1.z.nativeEnum(client_1.UserRole)
});
exports.StudentSigninSchema = zod_1.z.object({
    stuUserName: zod_1.z.string(),
    stuPassword: zod_1.z.string().min(8).max(16),
});
exports.AdminSignupSchema = zod_1.z.object({
    admName: zod_1.z.string(),
    admImg: zod_1.z.string(),
    admUserName: zod_1.z.string(),
    admPassword: zod_1.z.string().min(8).max(16),
    UserRole: zod_1.z.nativeEnum(client_1.UserRole),
});
exports.AdminSigninSchema = zod_1.z.object({
    admUserName: zod_1.z.string(),
    admPassword: zod_1.z.string().min(8).max(16),
});
