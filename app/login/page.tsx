"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/apiCall";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for App Router
// Note: The 'mobile' import and styled-components imports are no longer needed.

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.currentUser);
    // Assuming 'state.user' contains { isFetching: boolean, error: boolean }
    const { isFetching, error } = useSelector((state: RootState) => state.user);
    if (user !== null) {
        router.push("/");
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        login(dispatch, { username, password, type: "login" });
        router.push("/");
    };

    // Tailwind classes replace the styled components:

    return (
        // Container: Full viewport, background image with linear gradient overlay, centered content.
        // The responsive helper function from styled-components is replaced by Tailwind's responsive prefixes (e.g., 'md:').
        <div
            className="w-screen h-screen flex items-center justify-center bg-cover"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
                backgroundPosition: "center",
            }}
        >
            {/* Wrapper: 25% width on large screens, 75% on mobile (using md: prefix), padding, white background. */}
            {/* The original 'mobile' media query for width is approximated by applying a smaller width by default and a larger one on medium screens (md:). */}
            <div className="w-11/12 p-5 bg-white sm:w-3/4 md:w-1/4">
                {/* Title: 24px font size, font weight 300 */}
                <h1 className="text-2xl font-light">SIGN IN</h1>

                {/* Form: Flex column layout */}
                <form className="flex flex-col">
                    {/* Input: full width, margin top/bottom, padding. min-width 40% is not strictly needed in flex-col. */}
                    <input
                        className="flex-1 min-w-4/5 my-2 p-2 border border-gray-300"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="flex-1 min-w-4/5 my-2 p-2 border border-gray-300"
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Button: 40% width, no border, padding, teal background, white text, cursor pointer. */}
                    {/* Disabled state is handled by Tailwind's 'disabled:' pseudo-class, applying 'text-green-500' and 'cursor-not-allowed'. */}
                    <button
                        onClick={handleClick}
                        disabled={isFetching}
                        className="w-2/5 border-none py-3 px-5 bg-teal-500 text-white cursor-pointer mb-2
                         disabled:text-green-500 disabled:cursor-not-allowed disabled:bg-teal-300 transition duration-150"
                    >
                        LOGIN
                    </button>

                    {/* Error: Red text */}
                    {error && (
                        <span className="text-red-500">
                            Something went wrong...
                        </span>
                    )}

                    {/* Link: Margin, font size 12px, underline, cursor pointer */}
                    <a className="my-1 text-xs underline cursor-pointer">
                        FORGOT PASSWORD
                    </a>
                    <a className="my-1 text-xs underline cursor-pointer">
                        CREATE A NEW ACCOUNT
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
