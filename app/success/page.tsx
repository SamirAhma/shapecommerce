"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "@/lib/requestMethod";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // 👈 Use this hook to get URL query params

const Success = () => {
    // 1. Get the URL search parameters object
    const searchParams = useSearchParams();

    // 2. State to hold the parsed data
    const [stripeData, setStripeData] = useState<any>(null);
    const [cart, setCart] = useState<any>(null); // Cart structure needs to be defined
    const [orderId, setOrderId] = useState<string | null>(null);

    // Get current user from Redux
    const currentUser = useSelector((state: any) => state.user.currentUser);

    // 3. Effect to parse data from URL upon component mount
    useEffect(() => {
        const stripeDataString = searchParams.get("stripeData");
        const productsString = searchParams.get("products");

        let parsedStripeData = null;
        let parsedCart = null;

        try {
            if (stripeDataString) {
                // Parse the Stripe data back into an object
                parsedStripeData = JSON.parse(
                    decodeURIComponent(stripeDataString),
                );
                setStripeData(parsedStripeData);
            }
            if (productsString) {
                // Parse the Cart data back into an object
                parsedCart = JSON.parse(decodeURIComponent(productsString));
                setCart(parsedCart);
            }
        } catch (error) {
            console.error("Error parsing navigation data:", error);
            // Handle error, e.g., redirect user if data is invalid
        }

        // Log the successfully parsed data (optional)
        // console.log("Parsed Stripe Data:", parsedStripeData);
        // console.log("Parsed Cart:", parsedCart);
    }, [searchParams]); // Dependency ensures this runs when the URL changes

    // 4. Effect to create the order after data is parsed
    useEffect(() => {
        const createOrder = async () => {
            // Ensure we have a user, Stripe data (which contains payment confirmation), and cart items
            if (!currentUser || !stripeData || !cart || !cart.products) return;

            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item: any) => ({
                        // Assuming your cart item structure has _id and quantity
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.total,
                    // Get the final shipping/billing address from the Stripe charge object
                    address:
                        stripeData.data?.billing_details?.address ||
                        stripeData.billing_details?.address,

                    // You might want to include the Stripe charge ID for reference
                    paymentId: stripeData.id,
                });

                setOrderId(res.data._id);
            } catch (error) {
                console.error("Error creating order:", error);
            }
        };

        // Only run when both stripeData and cart are successfully loaded
        if (stripeData && cart) {
            createOrder();
        }
    }, [cart, stripeData, currentUser]);

    return (
        // Equivalent to:
        // height: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-xl md:text-2xl font-semibold mb-4">
                {orderId
                    ? `🎉 Order has been created successfully. Your order number is ${orderId}`
                    : `✅ Success! Your order is being prepared...`}
            </h1>

            {/* Equivalent to: style={{ padding: 10, marginTop: 20 }} */}
            <Link
                href="/"
                className="p-3 mt-5 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-150 shadow-lg"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default Success;
