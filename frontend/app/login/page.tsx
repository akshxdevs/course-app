"use client";
import { useState } from "react";
import { AppBar } from "../Componets/AppBar";
import { useRouter } from "next/navigation";
import { BACKEDN_URL } from "@/config";
import axios from "axios";

export default function(){
        const [userName,setUsername] = useState();
        const [password,setPassword] = useState();
        const router = useRouter();
    return <div>
        <AppBar/>
        <div className="flex justify-between">
            <div className="p-32">
                <img src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp" alt="" className="h-[600px] w-[600px]"/>
            </div>
            <div className="flex flex-col justify-center w-[700px] h-[700px]">
                <h1 className="text-3xl font-semibold w-95 text-center pb-5">Log in to continue your learning journey</h1>
                <div className="flex flex-col gap-3 px-5 w-[380px] pb-5">
                    <div className="border w-full p-3 rounded-md">
                        <input type="text" placeholder="Email" className="outline-none" value={userName} onChange={(e:any)=>{
                            setUsername(e.target.value);
                        }}/>
                    </div>
                    <div className="border w-full p-3 rounded-md">
                        <input type="text" placeholder="Password" className="outline-none" value={password} onChange={(e:any)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                </div>
                <div className="flex flex-col gap-5 px-5 text-center w-[380px]">
                    <div className="flex gap-2 justify-center border p-2 w-full rounded-md bg-purple-600 text-white font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <button onClick={async()=>{
                            try {
                                const res = await axios.post(`${BACKEDN_URL}/user/signin`,{
                                stuUserName:userName,
                                stuPassword:password,
                            });
                            if (res.data) {
                                console.log(res.data.user);
                                const userId = res.data.user.id;
                                localStorage.setItem("userId",res.data.user.id);
                                localStorage.setItem("name",res.data.user.stuName);
                                localStorage.setItem("token",res.data.token);
                                router.push(`/home`)
                            }else{
                                console.log("Error while fetching!!");
                            }
                            } catch (error) {
                             console.error("Something went wrong!",error);
                            }
                        }}>Continue with email</button>
                    </div>
                    <div className="flex flex-col font-semibold pt-3     text-sm">
                        <p className="underline text-purple-600 bg-slate-100 shadow-md p-4 border-b border-gray-400">log in to a different account</p>
                        <p className="bg-slate-100 shadow-md text-gray-800 font-light p-4 border-b border-gray-400">Don't have an account? <span className="underline text-purple-600 font-semibold">Sign up</span></p>
                        <p className="underline text-purple-600 bg-slate-100 shadow-md p-4 border-b border-gray-400">log in with you organization(admin)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}