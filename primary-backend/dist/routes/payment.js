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
exports.paymentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = require("../middleware/middleware");
const router = (0, express_1.Router)();
router.post("/buycourse/:id", middleware_1.userAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const { stuId } = req.body;
        const checkCourse = yield db_1.prismaClient.course.findFirst({
            where: {
                id: courseId
            }
        });
        if (!checkCourse)
            return res.status(404).json({ message: "Course Not Found!" });
        const buyCourse = yield db_1.prismaClient.course.update({
            where: {
                id: courseId,
            }, data: {
                students: stuId
            }
        });
        if (!buyCourse)
            return res.json(401).json({ message: "Unable to buy course right now | try again later!" });
        const token = yield jsonwebtoken_1.default.sign({
            purchaseToken: checkCourse.id
        }, config_1.USER_JWT);
        res.json({
            message: "Course Purchased Successfully!",
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
exports.paymentRouter = router;
