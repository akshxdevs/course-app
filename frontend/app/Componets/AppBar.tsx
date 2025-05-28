"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
return <div className="flex justify-between items-center px-5 py-3 shadow-lg relative">
  <button onClick={() => router.push("/home")}>
    <img src="./logo-udemy.svg" alt="udemy-logo" className="h-10 w-22" />
  </button>

  <div className="hidden md:flex items-center gap-4 text-sm text-slate-700">
    <p>Explore</p>
    <div className="flex items-center border p-2 rounded-full">
      <input type="text" placeholder="Search..." className="w-60 outline-none ml-2" />
    </div>
    <p>Plans & Pricing</p>
    <p>Udemy Business</p>
    <p>Teach on Udemy</p>
    <button onClick={() => router.push("/cart")}>
    </button>
    <button className="text-purple-600 border px-3 py-2 rounded-md" onClick={() => router.push("/login")}>Log in</button>
    <button className="bg-purple-600 text-white px-3 py-2 rounded-md" onClick={() => router.push("/signup")}>Sign up</button>
  </div>

  <div className="md:hidden">
    <button onClick={() => setMenuOpen(!menuOpen)}>
      <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</div>

}
