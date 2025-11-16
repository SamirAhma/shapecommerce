"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "@/redux/apiCall";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for App Router
// Note: styled-components imports are removed

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    // const navigate = useNavigate();
    const { isFetching, error } = useSelector((state: RootState) => state.user);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        login(dispatch, { username, email, password, type: "register" });
        router.push("/");
    };

    return (
        // Container: Full viewport, background image with linear gradient overlay, centered content.
        <div
            className="w-screen h-screen flex items-center justify-center bg-cover"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
                backgroundPosition: "center",
            }}
        >
            {/* Wrapper: 40% width on large screens (md:w-2/5),
        but responsive to be wider on small screens (w-11/12 or sm:w-3/4).
        Padding 20px (p-5), white background.
      */}
            <div className="w-11/12 p-5 bg-white sm:w-3/4 md:w-2/5">
                {/* Title: 24px font size (text-2xl), font weight 300 (font-light) */}
                <h1 className="text-2xl font-light">CREATE AN ACCOUNT</h1>

                {/* Form: Flex wrap layout */}
                <form className="flex flex-wrap">
                    {/* Input: Flex 1, min-width 40% (min-w-[40%]),
            margin: 20px 10px 0px 0px (mt-5 mr-2), padding 10px (p-2.5)
          */}
                    <input
                        className="flex-1 min-w-[40%] mt-5 mr-2 p-2.5 border"
                        placeholder="name"
                    />
                    <input
                        className="flex-1 min-w-[40%] mt-5 mr-2 p-2.5 border"
                        placeholder="last name"
                    />
                    <input
                        className="flex-1 min-w-[40%] mt-5 mr-2 p-2.5 border"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="flex-1 min-w-[40%] mt-5 mr-2 p-2.5 border"
                        placeholder="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="flex-1 min-w-[40%] mt-5 mr-2 p-2.5 border"
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="flex-1 min-w-[40%] mt-5 mr-2 p-2.5 border"
                        placeholder="confirm password"
                    />

                    {/* Agreement: font size 12px (text-xs), margin 20px 0px (my-5) */}
                    <span className="text-xs my-5">
                        By creating an account, I consent to the processing of
                        my personal data in accordance with the
                        <b className="font-bold"> PRIVACY POLICY</b>
                    </span>

                    {/* Button: 40% width (w-2/5), padding, teal background (bg-teal-500),
            white text, cursor pointer.
          */}
                    <button
                        onClick={handleClick}
                        disabled={isFetching}
                        className="w-2/5 border-none py-3 px-5 bg-teal-500 text-white cursor-pointer
                       disabled:bg-teal-300 disabled:cursor-not-allowed transition duration-150"
                    >
                        REGISTER
                    </button>

                    {/* Error: Red text */}
                    {error && (
                        <span className="text-red-500 mt-2">
                            Something went wrong...
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
