"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const types_1 = require("../types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = types_1.StudentSignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({ message: "Incorrect Inputs!", Error: parsedBody.error.errors });
        }
        const { stuName, stuUserName, stuPassword, UserRole } = parsedBody.data;
        const existingUser = yield db_1.prismaClient.student.findFirst({
            where: {
                stuUserName,
            }
        });
        if (existingUser) {
            return res.status(402).json({ message: "User Already exist!" });
        }
        const hashPassword = yield bcrypt_1.default.hash(stuPassword, 10);
        const createUser = yield db_1.prismaClient.student.create({
            data: {
                stuName,
                stuUserName,
                stuPassword: hashPassword,
                UserRole: "STUDENT",
            }
        });
        res.status(200).json({
            message: "User Created Successfully!",
            user: createUser
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went Wrong!", error });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = types_1.StudentSigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({ message: "Incorrect Inputs!", Error: parsedBody.error.errors });
        }
        const { stuUserName, stuPassword, } = parsedBody.data;
        const user = yield db_1.prismaClient.student.findFirst({
            where: {
                stuUserName
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const checkPassword = yield bcrypt_1.default.compare(stuPassword, user.stuPassword);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Password Didn't Match!",
            });
        }
        ;
        const token = jsonwebtoken_1.default.sign({
            user: user.id
        }, config_1.USER_JWT, { expiresIn: "1d" });
        res.status(200).json({
            message: "User Signed In Successfully!",
            user: user,
            token: token
        });
    }
    catch (error) {
        res.status(411).json({ message: "Something went Wrong!", error });
    }
}));
router.post("/login/otp", (req, res) => {
    try {
    }
    catch (error) {
    }
});
router.post("/login/generateotp", (req, res) => {
    try {
    }
    catch (error) {
    }
});
router.post("/login/check-otp", (req, res) => {
    try {
    }
    catch (error) {
    }
});
exports.userRouter = router;
