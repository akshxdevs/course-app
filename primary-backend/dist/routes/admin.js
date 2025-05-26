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
exports.adminRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = types_1.AdminSignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({ message: "Incorrect Inputs!", Error: parsedBody.error.errors });
        }
        const { admName, admImg, admUserName, admPassword, UserRole } = parsedBody.data;
        const existingUser = yield db_1.prismaClient.admin.findFirst({
            where: {
                admUserName,
            }
        });
        if (existingUser) {
            return res.status(402).json({ message: "Admin Already exist!" });
        }
        const hashPassword = yield bcrypt_1.default.hash(admPassword, 10);
        const createUser = yield db_1.prismaClient.admin.create({
            data: {
                admName,
                admImg,
                admUserName,
                admPassword: hashPassword,
                UserRole
            }
        });
        res.status(200).json({
            message: "Admin Created Successfully!",
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
        const parsedBody = types_1.AdminSigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({ message: "Incorrect Inputs!", Error: parsedBody.error.errors });
        }
        const { admUserName, admPassword, } = parsedBody.data;
        const admin = yield db_1.prismaClient.admin.findFirst({
            where: {
                admUserName
            }
        });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found!" });
        }
        const checkPassword = yield bcrypt_1.default.compare(admPassword, admin.admPassword);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Password Didn't Match!",
            });
        }
        ;
        const token = jsonwebtoken_1.default.sign({
            admin: admin.id
        }, config_1.ADMIN_JWT, { expiresIn: "1d" });
        res.status(200).json({
            message: "Admin Signed In Successfully!",
            admin: admin,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went Wrong!", error });
    }
}));
exports.adminRouter = router;
