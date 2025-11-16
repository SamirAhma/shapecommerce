import Link from "next/link";
// Removed: import styled from "styled-components";
// Removed: import { mobile } from "../responsive";
import { CategoryItem } from "@/types";

// Type the props object to explicitly use the CategoryItem type
interface CategoryProps {
    item: CategoryItem;
}
const CategoryItemComponent = ({ item }: CategoryProps) => (
    // Equivalent to <Container>
    // flex: 1; margin: 3px; height: 70vh; position: relative;
    <div className="flex-1 m-[3px] h-[70vh] relative">
        <Link href={`/productlist/${item.cat}`}>
            {/* Equivalent to <Image> */}
            {/* width: 100%; height: 100%; object-fit: cover; mobile: height: 20vh */}
            <img
                src={item.img}
                alt={item.title}
                className="w-full h-[20vh] object-cover sm:h-full"
            />

            {/* Equivalent to <Info> */}
            {/* position: absolute; width: 100%; height: 100%; top: 0; left: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center; */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                {/* Equivalent to <Title> */}
                {/* color: white; margin-bottom: 20px; */}
                <h1 className="text-white mb-5 text-3xl font-bold">
                    {item.title}
                </h1>

                {/* Equivalent to <Button> */}
                {/* border: none; padding: 10px; background-color: white;
            color: gray; cursor: pointer; font-weight: 600; */}
                <button className="border-none p-[10px] bg-white text-gray-700 cursor-pointer font-semibold transition duration-300 hover:bg-gray-100">
                    SHOP NOW
                </button>
            </div>
        </Link>
    </div>
);

export default CategoryItemComponent;
