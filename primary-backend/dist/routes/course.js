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
exports.courseRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const middleware_1 = require("../middleware/middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.get("/getallcourses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllCourse = yield db_1.prismaClient.course.findMany({});
        if (!getAllCourse) {
            return res.status(404).json("No Courses Found!");
        }
        res.json({
            message: "All Courses fetched Sucessfully!!",
            courses: getAllCourse
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
router.get("/getcourses/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const getCourse = yield db_1.prismaClient.course.findFirst({
            where: {
                id
            }
        });
        if (!getCourse) {
            return res.status(404).json("No Courses Found!");
        }
        res.json({
            message: "Course fetched Sucessfully!!",
            courses: getCourse
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
router.post("/publishcourse/:id", middleware_1.adminAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.id;
        const { courseName, courseImg, courseDescription, courseRating, hoursOfcontent, practicalExcercise, CoursePrice, } = req.body;
        const publishCourse = yield db_1.prismaClient.course.create({
            data: {
                courseName,
                courseImg,
                courseDescription,
                courseRating,
                hoursOfcontent,
                practicalExcercise,
                CoursePrice,
                tutorId: tutorId
            }
        });
        if (!publishCourse) {
            return res.status(404).json("Error While Publishing Course!");
        }
        yield db_1.prismaClient.course.update({
            where: {
                id: publishCourse.id
            }, data: {
                enrolledCount: {
                    increment: 1
                }
            }
        });
        res.json({
            message: "Course Published Successfully!",
            course: publishCourse
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
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
                students: {
                    connect: {
                        id: stuId
                    }
                }
            }
        });
        if (!buyCourse)
            return res.json(401).json({ message: "Unable to buy course right now | try again later!" });
        const token = yield jsonwebtoken_1.default.sign({
            courseId: checkCourse.id,
            courseName: checkCourse.courseName,
            buyerId: stuId,
        }, config_1.USER_JWT);
        yield db_1.prismaClient.purchaseToken.create({
            data: {
                stuId: stuId,
                purchaseToken: token
            }
        });
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
router.post("/addtowishlist/:id", middleware_1.adminAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const { courseName, courseImg, courseDescription, courseRating, hoursOfcontent, CoursePrice, stuId, } = req.body;
        const wishlistedCourse = yield db_1.prismaClient.wishlist.create({
            data: {
                courseId,
                courseName,
                courseImg,
                courseDescription,
                courseRating,
                hoursOfcontent,
                CoursePrice,
                stuId: stuId
            }
        });
        if (!wishlistedCourse) {
            return res.status(404).json("Error While Publishing Course!");
        }
        res.json({
            message: "Course Added To Wishlist Successfully!",
            course: wishlistedCourse
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
router.put("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
exports.courseRouter = router;
