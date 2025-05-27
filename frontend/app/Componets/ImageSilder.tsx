"use client";
import { useState } from "react";


export const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const imageArr = [
    "https://img-c.udemycdn.com/notices/web_carousel_slide/image/d4a1717d-1ad2-4570-adf9-e0ab20b3ab75.png",
    "https://img-c.udemycdn.com/notices/web_carousel_slide/image/9c276f10-7ba5-46a1-ac7e-e6087a9c28d4.jpg"
  ];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}>
        {imageArr.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>
      <button onClick={()=>{
            setIndex((prev) => (prev + 1) % imageArr.length);

        }}
        className="absolute w-10 top-72 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-80 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
      </button>
      <button onClick={()=>{
            setIndex((prev) => (prev - 1 + imageArr.length) % imageArr.length);
        }}
        className="absolute w-10 top-72 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-80 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
      </button>
    </div>
  );
};

