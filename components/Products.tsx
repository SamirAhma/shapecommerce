"use client";

import Product from "./Product";
import { useEffect, useState } from "react";
import { publicRequest } from "@/lib/requestMethod";
import { AxiosResponse } from "axios";

// --------------------------------------------------------
// Defined Interfaces (assuming ProductType is defined above)
// --------------------------------------------------------
interface ProductType {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories: string[];
    size: string[];
    color: string[];
    price: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string; // Added for the key in the map function
}

interface ProductsProps {
    cat?: string;
    filters?: Record<keyof ProductType | string, string>;
    sort?: "newest" | "asc" | "desc";
}
// --------------------------------------------------------

const Products: React.FC<ProductsProps> = ({ cat, filters = {}, sort }) => {
    // 1. Initialize state with the ProductType array
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

    // 2. Fetch products from the API
    useEffect(() => {
        const getProducts = async () => {
            try {
                // Explicitly define the expected response data type
                const res: AxiosResponse<ProductType[]> =
                    await publicRequest.get(
                        cat ? `/products?category=${cat}` : `/products`,
                    );
                // Map _id to id to satisfy the key requirement in the rendering logic
                const productsWithId = res.data.map((p) => ({
                    ...p,
                    id: p._id,
                }));
                setProducts(productsWithId);
            } catch (err) {
                // console.error(err); // Good practice to log errors
            }
        };
        getProducts();
    }, [cat]);

    // 3. Filter products based on category and filters
    useEffect(() => {
        // Only run if a category is present (otherwise we use the full 'products' list)
        if (cat) {
            setFilteredProducts(
                products.filter(
                    (
                        item: ProductType, // item is typed as ProductType
                    ) =>
                        Object.entries(filters).every(
                            (
                                [key, value]: [string, string], // key is a string, value is a string
                            ) => {
                                const productValue =
                                    item[key as keyof ProductType];

                                // Check if the property exists and handle both string and array types
                                if (
                                    productValue === undefined ||
                                    productValue === null
                                ) {
                                    return false;
                                }

                                if (Array.isArray(productValue)) {
                                    // For 'color' or 'size' arrays, check if the array includes the filter value
                                    return productValue.includes(value);
                                } else if (typeof productValue === "string") {
                                    // For single string fields (less common for filtering), check if it includes the value
                                    return productValue.includes(value);
                                }
                                return false; // If the property is neither array nor string (e.g., price, boolean)
                            },
                        ),
                ),
            );
        } else {
            // When no category is selected, the filtered list is the main product list
            setFilteredProducts(products);
        }
    }, [cat, filters, products]);

    // 4. Sort filtered products
    useEffect(() => {
        setFilteredProducts((prev: ProductType[]) => {
            // prev is typed as ProductType[]
            if (sort === "newest") {
                // Convert string dates to Date objects for accurate comparison
                return [...prev].sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                );
            } else if (sort === "asc") {
                // Sort by price ascending
                return [...prev].sort((a, b) => a.price - b.price);
            } else if (sort === "desc") {
                // Sort by price descending
                return [...prev].sort((a, b) => b.price - a.price);
            }
            return prev; // Return previous state if sort is not matched
        });
    }, [sort]);

    return (
        <div className="p-5 flex flex-wrap justify-between">
            {/* Conditional rendering based on whether 'cat' (category) is present */}
            {cat
                ? filteredProducts.map((item: ProductType) => (
                      <Product item={item} key={item.id} />
                  ))
                : products
                      .slice(0, 8)
                      .map((item: ProductType) => (
                          <Product item={item} key={item.id} />
                      ))}
        </div>
    );
};

export default Products;
