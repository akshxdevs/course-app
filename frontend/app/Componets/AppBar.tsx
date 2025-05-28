"use client";

import { useRouter } from "next/navigation";

export const AppBar = () => {
    const router = useRouter();
    return <div className="flex justify-between items-center px-5 py-3 shadow-lg relative">
        <div className="flex justify-center items-center">
            <button onClick={()=>{
                router.push("/home")
            }}>
                <img src="./logo-udemy.svg" alt="udemy-logo" className="h-10 w-22"/>
            </button>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm text-slate-700">
            <p>Explore</p>
        </div>
        <div className="flex my-2 border p-3 rounded-full text-sm gap-3 h-12">
            <button> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
            <input type="text" placeholder="Find exper-led courses to boost your career" className="w-[600px] outline-none border-none" />
        </div>
        <div className="flex justify-center items-center text-sm">
            <p>Plans & Pricing</p>
        </div>
        <div className="flex justify-center items-center text-sm">
            <p>Udemy Business</p>
        </div>
        <div className="flex justify-center items-center text-sm">
            <p>Teach on Udemy</p>
        </div>
        <div className="flex justify-center items-center text-sm">
            <button onClick={()=>{
                router.push("/cart")
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </button>
        </div>
        <div className="flex justify-center items-center gap-3">
            <button className="px-4 py-3 text-sm font-bold border border-purple-600 text-purple-600 rounded-md" onClick={()=>{
                router.push("/login")
            }}>Log in</button>
            <button className="px-4 py-3 text-sm font-bold border rounded-md text-white bg-purple-600" onClick={()=>{
                router.push("/signup")
            }}>Sign up</button>
            <button className="py-3 px-3 border rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            </button>
        </div>
    </div>
}