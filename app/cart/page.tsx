"use client";
import { Add, Remove } from "@mui/icons-material";
// Note: 'mobile' helper is no longer needed, using Tailwind's responsive prefixes (e.g., sm:, md:, lg:)
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { userRequest } from "@/lib/requestMethod";
import { useRouter } from "next/navigation"; // For App Router
import { RootState } from "@/redux/store";
import { Token } from "react-stripe-checkout";
// Assume the 'mobile' constant was used for responsive breakpoints,
// which is now handled by Tailwind's utility classes.

// Assumes you are 100% certain this key is set in your .env.local file.
// If it's not set, this will cause a runtime error.
const KEY: string = process.env.NEXT_PUBLIC_REACT_APP_STRIPE!;

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const [stripeToken, setStripeToken] = useState<Token | null>(null); // State type is also improved
    const router = useRouter();

    const onToken = (token: Token) => {
        setStripeToken(token);
    };
    console.log(cart);
    // Console log removed for cleaner production code, but left for context if needed:
    // console.log(stripeToken);

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken?.id,
                    amount: cart.total * 100, // Amount should be the total cart price
                });

                // Convert complex objects to JSON strings for URL safety
                console.log(res);

                // // Navigate using router.push, placing data in the query string
                // router.push({ pathname: "/success",
                //     query: {
                //         stripeData: stripeDataString,
                //         products: productsString,
                //     },
                // });
                // Assuming stripeDataString and productsString are already JSON.stringified
                const stripeDataString = JSON.stringify(res.data);
                const productsString = JSON.stringify(cart);

                // Construct the URL string manually with encoded query parameters
                const queryString = new URLSearchParams({
                    stripeData: stripeDataString,
                    products: productsString,
                }).toString();

                // The function now receives a single string, resolving the TypeError.
                router.push(`/success?${queryString}`);
            } catch (err) {
                console.log(err);
            }
        };
        // Ensure stripeToken is available and has an id before making the request
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, router, cart]); // Added cart to dependencies

    return (
        // Container (equivalent to styled.div``)
        <div className="">
            {/* Wrapper (padding: 20px; ${mobile({ padding: "10px" })}) */}
            <div className="p-5 lg:p-10">
                {/* Title (font-weight: 300; text-align: center;) */}
                <h1 className="font-light text-center text-2xl md:text-3xl">
                    YOUR BAG
                </h1>

                {/* This block was outside the styled-component structure but present in the JSX.
            It's kept here but will likely need styling if it's meant to be displayed.
            It looks like placeholder credit card info.
        */}
                <div className="hidden">
                    <div>4242-4242-4242-4242</div>
                    <p>08/24</p>
                    <p>123</p>
                </div>

                {/* Top (display: flex; align-items: center; justify-content: space-between; padding: 20px;) */}
                <div className="flex items-center justify-between p-5">
                    {/* TopButton (Base style: padding: 10px; font-weight: 600; cursor: pointer;) */}
                    <button className="p-2 font-semibold cursor-pointer border border-black hover:bg-gray-100 transition duration-150">
                        CONTINUE SHOPPING
                    </button>

                    {/* TopTexts (${mobile({ display: "none" })}) */}
                    <div className="hidden lg:flex">
                        {/* TopText (text-decoration: underline; cursor: pointer; margin: 0px 10px;) */}
                        <span className="underline cursor-pointer mx-2">
                            Shopping Bag({cart.products.length})
                        </span>
                        <span className="underline cursor-pointer mx-2">
                            Your Wishlist (0)
                        </span>
                    </div>

                    {/* TopButton (type="filled": border: none; background-color: black; color: white;) */}
                    <button className="p-2 font-semibold cursor-pointer border-none bg-black text-white hover:opacity-80 transition duration-150">
                        CHECKOUT NOW
                    </button>
                </div>

                {/* Bottom (display: flex; justify-content: space-between; ${mobile({ flexDirection: "column" })}) */}
                <div className="flex justify-between flex-col lg:flex-row mt-5">
                    {/* Info (flex: 3;) */}
                    <div className="flex-[3] mr-5">
                        {cart.products.map((product) => (
                            <>
                                {/* Product (display: flex; justify-content: space-between; ${mobile({ flexDirection: "column" })}) */}
                                <div
                                    key={product._id}
                                    className="flex justify-between flex-col md:flex-row mb-5"
                                >
                                    {/* ProductDetail (flex: 2; display: flex;) */}
                                    <div className="flex-[2] flex">
                                        {/* Image (width: 200px;) */}
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="w-52 object-cover"
                                        />
                                        {/* Details (padding: 20px; display: flex; flex-direction: column; justify-content: space-around;) */}
                                        <div className="p-5 flex flex-col justify-around">
                                            {/* ProductName */}
                                            <span className="mb-2">
                                                <b className="font-semibold">
                                                    Product:
                                                </b>{" "}
                                                {product.title}
                                            </span>
                                            {/* ProductId */}
                                            <span className="mb-2">
                                                <b className="font-semibold">
                                                    ID:
                                                </b>{" "}
                                                {product._id}
                                            </span>
                                            {/* ProductColor (width: 20px; height: 20px; border-radius: 50%;) */}
                                            <div
                                                className="w-5 h-5 rounded-full mb-2"
                                                style={{
                                                    backgroundColor:
                                                        product.color,
                                                }}
                                            />
                                            {/* ProductSize */}
                                            <span>
                                                <b className="font-semibold">
                                                    Size:
                                                </b>{" "}
                                                {product.size}
                                            </span>
                                        </div>
                                    </div>

                                    {/* PriceDetail (flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;) */}
                                    <div className="flex-1 flex flex-col items-center justify-center mt-5 md:mt-0">
                                        {/* ProductAmountContainer (display: flex; align-items: center; margin-bottom: 20px;) */}
                                        <div className="flex items-center mb-5">
                                            <Add className="cursor-pointer" />
                                            {/* ProductAmount (font-size: 24px; margin: 5px; ${mobile({ margin: "5px 15px" })}) */}
                                            <div className="text-xl mx-2 md:mx-4">
                                                {product.quantity}
                                            </div>
                                            <Remove className="cursor-pointer" />
                                        </div>
                                        {/* ProductPrice (font-size: 30px; font-weight: 200; ${mobile({ marginBottom: "20px" })}) */}
                                        <div className="text-3xl font-light mb-5 md:mb-0">
                                            $ {product.price * product.quantity}
                                        </div>
                                    </div>
                                </div>
                                {/* Hr (background-color: #eee; border: none; height: 1px;) */}
                                <hr className="bg-gray-200 border-none h-px my-5" />
                            </>
                        ))}
                    </div>

                    {/* Summary (flex: 1; border: 0.5px solid lightgray; border-radius: 10px; padding: 20px; height: 50vh;) */}
                    <div className="flex-1 border border-gray-300 rounded-lg p-5 h-fit mt-5 lg:mt-0">
                        {/* SummaryTitle (font-weight: 200;) */}
                        <h1 className="font-light text-2xl">ORDER SUMMARY</h1>

                        {/* SummaryItem (margin: 30px 0px; display: flex; justify-content: space-between;) */}
                        <div className="flex justify-between my-7">
                            {/* SummaryItemText & SummaryItemPrice */}
                            <span className="text-base">Subtotal</span>
                            <span className="text-base">$ {cart.total}</span>
                        </div>

                        <div className="flex justify-between my-7">
                            <span className="text-base">
                                Estimated Shipping
                            </span>
                            <span className="text-base">$ 5.90</span>
                        </div>

                        <div className="flex justify-between my-7">
                            <span className="text-base">Shipping Discount</span>
                            <span className="text-base">$ -5.90</span>
                        </div>

                        {/* SummaryItem (type="total": font-weight: 500; font-size: 24px;) */}
                        <div className="flex justify-between my-7 font-semibold text-2xl">
                            <span className="text-2xl">Total</span>
                            <span className="text-2xl">$ {cart.total}</span>
                        </div>

                        {/* Only render StripeCheckout if KEY exists */}
                        {KEY && (
                            <StripeCheckout
                                name="Lama Shop"
                                image=""
                                billingAddress
                                shippingAddress
                                description={`Your total is $${cart.total}`}
                                amount={cart.total * 100}
                                token={onToken}
                                // KEY is guaranteed to be a string here
                                stripeKey={KEY}
                                label="CHECKOUT NOW" // Use the 'label' prop to change the button text
                            ></StripeCheckout>
                        )}
                        {!KEY && (
                            <div className="text-red-600 font-semibold mt-4">
                                Stripe Key is missing. Cannot checkout.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
