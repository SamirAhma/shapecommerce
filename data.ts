// Do not use imports like these:
// import bg from "@/assets/bg-2.jpg";
// import prod from "./assets/shirt1.png";
// import prod2 from "./assets/shirt2.jpg";
// import prod3 from "./assets/shirt3.png";
// import prod4 from "./assets/shirt4.png";
import { Categories } from "./types"; // Assuming you put the interface in a 'types.ts' file
export const sliderItems = [
    {
        id: 1,
        img: "https://i.ibb.co/cXFnLLV/3.png",
        title: "SUMMER SALE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "f5fafd",
    },
    {
        id: 2,
        img: "https://i.ibb.co/DG69bQ4/2.png",
        title: "AUTUMN COLLECTION",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "fcf1ed",
    },
    {
        id: 3,
        // Kept the path from the original slider item 3
        img: "/assets/bg-2.jpg",
        title: "LOUNGEWEAR LOVE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "ffec01",
    },
];

export const categories: Categories = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "SHIRT STYLE!",
        cat: "women",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "LOUNGEWEAR LOVE",
        cat: "coat",
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        title: "LIGHT JACKETS",
        cat: "jeans",
    },
];

export const popularProducts = [
    {
        id: 1,
        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    },
    {
        id: 2,
        // Using string path instead of imported 'prod'
        img: "./assets/shirt1.png",
    },
    {
        id: 3,
        // Using string path instead of imported 'prod2'
        img: "./assets/shirt2.jpg",
    },
    {
        id: 4,
        // Using string path instead of imported 'prod3'
        img: "./assets/shirt3.png",
    },
    {
        id: 5,
        img: "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
    },
    {
        id: 6,
        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
    },
    {
        id: 7,
        // Using string path instead of imported 'prod4'
        img: "./assets/shirt4.png",
    },
    {
        id: 8,
        img: "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
    },
];

// 4242424242424242
// 08/24 123
