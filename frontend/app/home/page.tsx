"use client";
import { useEffect, useState } from "react";
import { AppBar } from "../Componets/AppBar";
import { ImageSlider } from "../Componets/ImageSilder";
import axios from "axios";
import { BACKEDN_URL } from "@/config";

export default function(){
    const [courses,setCourse] = useState<any[]>([]);
    async function getAllCourse(){
        try {
            const res = await axios.get(`${BACKEDN_URL}/course/getallcourses`,{
        });
        if (res.data) {
            console.log(res.data);
            setCourse(res.data.courses);
        } 
        console.log(courses);
        } catch (error) {
            console.error(error);
            
        }
    }
    useEffect(()=>{
        const getUserId = localStorage.getItem("userId");
        const getName = localStorage.getItem("name");
        const getUserImg = localStorage.getItem("UserImg");
        console.log(getUserId,getName,getUserImg);
        getAllCourse();
    },[])
    return <div className="">
        <AppBar/>
        <ImageSlider/>
        <div>
            <div className="flex flex-col">
                <h1 className="text-3xl pt-5 pb-1 px-5 font-semibold">All the skills you need in one place</h1>
                <p className="text-lg px-5 text-slate-600">From critical skills to technical topics, Udemy supports your professional development.</p>
            </div>
            <div>
                {courses.length > 0 ? (
                    <div className="grid grid-cols-4 px-32 py-10">
                        {courses.map((course,index)=>(
                            <div key={index || course.id} className="rounded shadow-xl w-62">
                                <img src={course.courseImg} alt="" className="w-80 h-48 bg-orange-400"/>
                                <h1 className="px-5 py-2 font-semibold text-sm">{course.courseName}</h1>
                                <div className="w-95">
                                {/* <p className="px-5 pb-2 font-light text-slate-600 text-xs truncate whitespace-nowrap">
                                    {course.courseDescription.split(" ").length > 5
                                    ? course.courseDescription.split(" ").slice(0, 5).join(" ") + "..."
                                    : course.courseDescription}
                                </p> */}
                                </div>
                                <p className="px-5 pb-1 text-yellow-500">{course.courseRating}</p>
                                <p className="px-5 pb-1 font-bold">₹{course.CoursePrice}</p>
                            </div>
                        ))}
                    </div>
                ):(
                    <div>
                        <span>No Course!! {":("}</span>
                    </div>
                )}
            </div>
        </div>
    </div>
}