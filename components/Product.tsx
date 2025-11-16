import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";
import React from "react"; // Required for React.FC

// --- Defined Interfaces ---
interface ProductItem {
    _id: string;
    title: string;
    img: string;
}

interface ProductProps {
    item: ProductItem;
    // Note: The 'key' prop is generally discouraged when passing props directly;
    // it's primarily used by React during array mapping. However, if included,
    // its type is string | number. We use React.Key for better typing.
    key: React.Key;
}
// ------------------------

// Apply the ProductProps interface to the component
const Product: React.FC<ProductProps> = ({ item, key }) => {
    return (
        // Container: flex container for the product card
        <div
            key={key} // Explicitly using the key prop
            className="flex-1 m-1.5 min-w-[280px] h-[350px] flex items-center justify-center bg-[#f5fbfd] relative group"
        >
            {/* Circle: decorative element behind the image */}
            <div className="w-[200px] h-[200px] rounded-full bg-white absolute" />

            {/* Image: the main product visual */}
            {/* Type annotation ensures item.img and item.title exist (based on ProductItem) */}
            <img src={item.img} alt={item.title} className="h-[75%] z-10" />

            {/* Info Overlay: Hidden by default, appears on group-hover */}
            <div
                className="
          opacity-0 absolute top-0 left-0 w-full h-full bg-black/20 z-20
          flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer
          group-hover:opacity-100
        "
            >
                {/* Icon for Add to Cart */}
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center m-2 transition-all duration-500 ease-in-out hover:bg-[#e9f5f5] hover:scale-110">
                    <ShoppingCartOutlinedIcon />
                </div>

                {/* Icon for View Product Details */}
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center m-2 transition-all duration-500 ease-in-out hover:bg-[#e9f5f5] hover:scale-110">
                    {/* Link to the product detail page using the item's _id */}
                    <Link href={`/product/${item._id}`}>
                        <SearchOutlinedIcon />
                    </Link>
                </div>

                {/* Icon for Add to Wishlist/Favorites */}
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center m-2 transition-all duration-500 ease-in-out hover:bg-[#e9f5f5] hover:scale-110">
                    <FavoriteBorderOutlinedIcon />
                </div>
            </div>
        </div>
    );
};

export default Product;
