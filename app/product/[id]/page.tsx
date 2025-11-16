"use client";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { publicRequest } from "@/lib/requestMethod";
import { addProduct } from "@/redux/cartRedux";
import { useDispatch } from "react-redux";
import { use } from "react";
import { ChangeEvent } from "react"; // Import ChangeEvent for select handler

// --- TYPE DEFINITIONS ---

// 1. Define the structure of the product fetched from the API
interface ProductData {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories: string[];
    size: string[];
    color: string[];
    price: number;
    // Add any other properties your product object has
}

// 2. Define the initial state (null is better than an empty object here)
// We use a union type: ProductData | null
type ProductState = ProductData | null;

// 3. Define the component's props
interface Props {
    params: Promise<{ id: string }>;
}

// 4. Define the allowed values for the quantity handler
type QuantityAction = "inc" | "dec";

// --- COMPONENT START ---

function Product({ params }: Props) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    // Use defined types for state
    const [product, setProduct] = useState<ProductState>(null);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                // Assuming the API response body matches ProductData
                const res = await publicRequest.get<ProductData>(
                    "/products/find/" + id,
                );

                setProduct(res.data);

                // Initialize color/size with the first available option if product is fetched
                if (res.data.color.length > 0) {
                    setColor(res.data.color[0]);
                }
                if (res.data.size.length > 0) {
                    setSize(res.data.size[0]);
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
            }
        };
        getProduct();
    }, [id]);

    // Added type for 'type' parameter
    const handleQuantity = (type: QuantityAction) => {
        if (type === "dec") {
            // NOTE: The previous code used "desc", but your button uses "dec".
            // I've corrected the handler logic to check for "dec" (decrement).
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    // Added type for the select change event
    const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSize(e.target.value);
    };

    const handleClick = () => {
        // Guard clause to prevent dispatching if product data isn't loaded or required fields are missing
        if (!product || !color || !size) {
            alert("Please select a color and size before adding to cart.");
            return;
        }

        // Dispatch the action with required payload
        dispatch(
            addProduct({
                ...product,
                quantity,
                color,
                size,
                // Ensure price and total are correctly calculated based on Redux logic
                price: product.price, // Include price from the fetched product
            }),
        );
    };

    // If product is null (still loading or failed), render a loading state
    if (!product) {
        return (
            <div className="p-12 text-center text-xl">
                Loading product details...
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row p-4 md:p-12">
                {/* Image */}
                <div className="flex-1">
                    {/* Access properties safely now that 'product' is checked */}
                    <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-[40vh] md:h-[90vh] object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 px-4 md:px-12 mt-4 md:mt-0">
                    <h1 className="font-light text-3xl">{product.title}</h1>
                    <p className="my-5">{product.desc}</p>
                    <span className="text-4xl font-thin">
                        ${product.price.toFixed(2)}
                    </span>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mt-8">
                        {/* Color Selection */}
                        <div className="flex items-center mb-4 sm:mb-0">
                            <span className="text-lg font-light mr-2">
                                Color
                            </span>
                            {/* Check for product.color existence before mapping */}
                            {product.color?.map((c) => (
                                <div
                                    key={c}
                                    onClick={() => setColor(c)}
                                    // Add conditional border for selected color
                                    className={`w-5 h-5 rounded-full cursor-pointer mr-1 border ${color === c ? "border-2 border-gray-900" : "border-gray-400"}`}
                                    style={{ backgroundColor: c }}
                                ></div>
                            ))}
                        </div>

                        {/* Size Selection */}
                        <div className="flex items-center">
                            <span className="text-lg font-light mr-2">
                                Size
                            </span>
                            <select
                                onChange={handleSizeChange} // Use the new typed handler
                                className="border border-gray-300 p-1"
                                value={size} // Control the select input
                            >
                                {/* Default option if size state is empty */}
                                {!size && (
                                    <option value="" disabled>
                                        Select Size
                                    </option>
                                )}

                                {/* Check for product.size existence before mapping */}
                                {product.size?.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Add to cart */}
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-8">
                        <div className="flex items-center font-bold mb-4 sm:mb-0">
                            <Remove
                                className="cursor-pointer"
                                onClick={() => handleQuantity("dec")} // Use "dec"
                            />
                            <span className="w-8 h-8 rounded-md border border-teal-500 flex items-center justify-center mx-2">
                                {quantity}
                            </span>
                            <Add
                                className="cursor-pointer"
                                onClick={() => handleQuantity("inc")} // Use "inc"
                            />
                        </div>
                        <button
                            onClick={handleClick}
                            className="p-4 border border-teal-500 font-medium bg-white hover:bg-gray-100 transition disabled:opacity-50"
                            // Disable button if color or size is not selected
                            disabled={!color || !size}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
