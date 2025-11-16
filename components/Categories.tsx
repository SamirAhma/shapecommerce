import { categories } from "../data";
// Removed: import styled from "styled-components";
import CategoryItem from "./CategoryItem";
// Removed: import { mobile } from "../responsive";

const Categories = () => {
    return (
        // Equivalent to <Container>
        // Styles: display: flex; padding: 20px; justify-content: space-between;
        // Mobile (<1180px): padding: 0px; flex-direction: column;

        // Note: Tailwind uses a mobile-first approach. We'll set the default (small screen) styles first.

        <div
            // Default (Mobile/Small Screen) styles based on your media query (flex-direction: column; padding: 0px;)
            className="flex flex-col p-0

                 // Styles for larger screens (>1180px)
                 lg:flex-row lg:justify-between lg:p-5"
        >
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </div>
    );
};

export default Categories;
