"use client";
import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "@/data";

// ---------------------------------------------------------
// Define the type for the Slider items
interface SliderItem {
    id: number;
    img: string;
    title: string;
    desc: string;
    bg: string;
}

// Define the Prop types for the Arrow component
interface ArrowProps {
    // 'direction' can only be 'left' or 'right'
    direction: "left" | "right";
    // 'onClick' is a function that takes nothing and returns void
    onClick: () => void;
}
// Helper component for the navigation arrows
const Arrow: React.FC<ArrowProps> = ({ direction, onClick }) => (
    // Original styles: absolute, centered vertically, rounded, light background, flex container, opacity
    <div
        className={`
      w-12 h-12 bg-gray-100 rounded-full
      flex items-center justify-center
      absolute top-0 bottom-0 m-auto cursor-pointer
      opacity-50 hover:opacity-100 transition-opacity
      z-10 shadow-lg
      ${direction === "left" ? "left-4" : "right-4"}
    `}
        onClick={onClick}
    >
        {direction === "left" ? (
            <ArrowLeftIcon sx={{ fontSize: 40 }} />
        ) : (
            <ArrowRightOutlined sx={{ fontSize: 24 }} />
        )}
    </div>
);

const App = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction: "left" | "right") => {
        if (direction === "left") {
            // If slideIndex > 0, decrease it; otherwise, loop to the last slide (index 2)
            setSlideIndex((prev) =>
                prev > 0 ? prev - 1 : sliderItems.length - 1,
            );
        } else {
            // If slideIndex < last index, increase it; otherwise, loop to the first slide (index 0)
            setSlideIndex((prev) =>
                prev < sliderItems.length - 1 ? prev + 1 : 0,
            );
        }
    };

    return (
        // Container: 100% width, 100vh height, flex, relative, hidden on small screens
        <div className="w-full h-screen flex relative overflow-hidden hidden sm:flex">
            {/* Left Arrow */}
            <Arrow direction="left" onClick={() => handleClick("left")} />

            {/* Wrapper: Manages the horizontal translation */}
            <div
                className="h-full flex transition-all duration-1000 ease-in-out"
                style={{ transform: `translateX(${slideIndex * -100}vw)` }}
            >
                {sliderItems.map((item) => (
                    // Slide: 100vw, 100vh, flex, items-center, dynamic background
                    <div
                        className="w-screen h-screen flex items-center"
                        style={{ backgroundColor: `#${item.bg}` }}
                        key={item.id}
                    >
                        {/* Image Container: flex-1, full height, centered */}
                        <div className="h-full flex-1 flex items-center justify-center">
                            {/* Image: 80% height, object-contain */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-4/5 object-contain"
                            />
                        </div>

                        {/* Info Container: flex-1, padding */}
                        <div className="flex-1 p-12">
                            {/* Title: large, bold text */}
                            <h1 className="text-7xl font-extrabold mb-5 text-gray-800">
                                {item.title}
                            </h1>
                            {/* Desc: large font, tracking, vertical margin */}
                            <p className="my-12 text-xl font-medium tracking-widest leading-relaxed">
                                {item.desc}
                            </p>
                            {/* Button: styled button */}
                            <button className="p-3 text-xl bg-transparent cursor-pointer border border-gray-800 text-gray-800 font-semibold transition-colors duration-200 hover:bg-gray-800 hover:text-white rounded-lg">
                                SHOP NOW
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <Arrow direction="right" onClick={() => handleClick("right")} />
        </div>
    );
};

export default App;
