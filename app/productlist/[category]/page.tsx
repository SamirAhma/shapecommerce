// /app/ProductList.tsx
// ...

"use client";
import { useState, ChangeEvent } from "react"; // Add ChangeEvent for better type safety
import { use } from "react";
import Products from "@/components/Products";

// --- TYPE DEFINITIONS ---

// Define the allowed values for the 'sort' state
type SortOptions = "newest" | "asc" | "desc";

// Define the shape of the 'filters' state
interface FiltersState {
    [key: string]: string; // Allows any string key (like 'color', 'size') with a string value
}

// Define the component's props
interface Props {
    params: Promise<{ cat: string }>;
}
// --- END TYPE DEFINITIONS ---

const ProductList = ({ params }: Props) => {
    const resolvedParams = use(params);
    const cat = resolvedParams.cat;

    // Use the defined types for state
    const [filters, setFilters] = useState<FiltersState>({});
    const [sort, setSort] = useState<SortOptions>("newest"); // 'sort' is now type-safe

    // Use ChangeEvent<HTMLSelectElement> for the event type
    const handleFilters = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const name = e.target.name; // Get the name property

        setFilters({
            ...filters,
            [name]: value, // Use the name property to set the key
        });
    };

    return (
        <div>
            {/* Title: margin 20px (m-5), text-transform capitalize (capitalize) */}
            <h1 className="m-5 capitalize">{cat}</h1>

            {/* FilterContainer: display flex (flex), justify-content space-between (justify-between) */}
            <div className="flex justify-between">
                <div className="flex m-5 items-center sm:flex-col sm:items-start sm:m-2">
                    <span className="text-xl font-semibold mr-5 sm:mr-0 sm:mb-2">
                        Filter Products:
                    </span>

                    <select
                        name="color"
                        onChange={handleFilters}
                        className="p-2.5 mr-5 border sm:my-2 sm:mr-0"
                    >
                        <option disabled selected>
                            Color
                        </option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                    </select>

                    <select
                        name="size"
                        onChange={handleFilters}
                        className="p-2.5 mr-5 border sm:my-2 sm:mr-0"
                    >
                        <option disabled selected>
                            Size
                        </option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>

                {/* Filter (Sort) */}
                <div className="flex m-5 items-center sm:m-2">
                    <span className="text-xl font-semibold mr-5 sm:mr-2">
                        Sort Products:
                    </span>
                    <select
                        // Ensure the value passed to setSort is one of the SortOptions
                        onChange={(e) => setSort(e.target.value as SortOptions)}
                        className="p-2.5 border"
                    >
                        {/* The 'value' must match the union type: "newest", "asc", or "desc" */}
                        <option value="newest">Newest</option>
                        <option value="asc">Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </div>
            </div>

            <Products cat={cat} filters={filters} sort={sort} />
        </div>
    );
};

export default ProductList;
