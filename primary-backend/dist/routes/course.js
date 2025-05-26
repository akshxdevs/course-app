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
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const middleware_1 = require("../middleware/middleware");
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
router.put("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "Something went wrong!" });
    }
}));
exports.courseRouter = router;
