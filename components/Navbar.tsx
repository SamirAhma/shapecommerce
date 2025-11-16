"use client";
import { Search } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// Removed: import { mobile } from "../responsive"; (since we use Tailwind responsiveness)
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// Removed: import "./style.css"; (assuming the styles were mainly for the Navbar)
import "./style.css";
import { logout } from "@/redux/userRedux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
const Navbar = () => {
    const quantity = useSelector((state: RootState) => state.cart.quantity);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize the hook
    console.log(user);
    const handleLogout = () => {
        dispatch(logout());
        // Use router.push() instead of navigate()
        router.push("/login");
    };

    return (
        // Equivalent to: <Container> (height: 60px; mobile: 50px)
        <div className="h-[60px] sm:h-[50px] shadow-md">
            {/* Equivalent to: <Wrapper> (padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; mobile: 10px 0px) */}
            <div className="py-[10px] px-0 flex items-center justify-between sm:px-5">
                {/* Equivalent to: <Left> (flex: 1; display: flex; align-items: center;) */}
                <div className="flex-1 flex items-center">
                    {/* Equivalent to: <Language> (font-size: 14px; cursor: pointer; mobile: display: none) */}
                    <span className="text-sm cursor-pointer hidden sm:inline">
                        EN
                    </span>

                    {/* Equivalent to: <SearchContainer> (border: 0.5px solid lightgray; display: flex; align-items: center; margin-left: 25px; padding: 5px) */}
                    <div className="border border-gray-300 flex items-center ml-[25px] p-[5px]">
                        {/* Equivalent to: <Input> (border: none; mobile: width: 50px) */}
                        <input
                            placeholder="Search"
                            className="border-none focus:outline-none sm:w-full w-[50px]"
                        />
                        {/* Original inline style: style={{ color: "gray", fontSize: 16 }} */}
                        <Search className="text-gray-500 text-base" />
                    </div>
                </div>

                {/* Equivalent to: <Center> (flex: 1; text-align: center) */}
                <div className="flex-1 text-center">
                    <Link href="/" className="linkNavbar">
                        {/* Equivalent to: <Logo> (font-weight: bold; mobile: font-size: 24px) */}
                        <h1 className="font-bold text-3xl sm:text-2xl">
                            SHAPE.
                        </h1>
                    </Link>
                </div>

                {/* Equivalent to: <Right> (flex: 1; display: flex; align-items: center; justify-content: flex-end; mobile: flex: 2, justify-content: center) */}
                <div className="flex-1 flex items-center  sm:flex-1 sm:justify-end justify-center">
                    {user?._id === null ? (
                        <>
                            <Link className="linkNavbar" href="/register">
                                {/* Equivalent to: <MenuItem> (font-size: 14px; cursor: pointer; margin-left: 25px; mobile: 12px, 10px) */}
                                <div className="text-sm cursor-pointer ml-[25px] sm:text-xs sm:ml-[10px] text-black no-underline">
                                    REGISTER
                                </div>
                            </Link>
                            <Link className="linkNavbar" href="/login">
                                <div className="text-sm cursor-pointer ml-[25px] sm:text-xs sm:ml-[10px] text-black no-underline">
                                    SIGN IN
                                </div>
                            </Link>
                        </>
                    ) : (
                        <div
                            onClick={handleLogout}
                            className="text-sm cursor-pointer ml-[25px] sm:text-xs sm:ml-[10px] text-black no-underline"
                        >
                            Logout
                        </div>
                    )}

                    <Link href="/cart">
                        <div className="text-sm cursor-pointer ml-[25px] sm:text-xs sm:ml-[10px] text-black no-underline">
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
