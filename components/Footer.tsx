import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@mui/icons-material";

const Footer = () => {
    return (
        <div className="flex flex-col md:flex-row">
            {/* LEFT */}
            <div className="flex-1 flex flex-col p-5">
                <h1 className="text-3xl font-bold">LAMA.</h1>

                <p className="my-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don’t
                    look even slightly believable.
                </p>

                <div className="flex">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#3b5999] text-white mr-5">
                        <FacebookIcon />
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E4405F] text-white mr-5">
                        <InstagramIcon />
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#55ACEE] text-white mr-5">
                        <Pinterest />
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E60023] text-white mr-5">
                        <Twitter />
                    </div>
                </div>
            </div>

            {/* CENTER */}
            <div className="flex-1 p-5 hidden md:block">
                <h3 className="text-xl font-semibold mb-7">Useful Links</h3>

                <ul className="m-0 p-0 list-none flex flex-wrap">
                    {[
                        "Home",
                        "Cart",
                        "Man Fashion",
                        "Woman Fashion",
                        "Accessories",
                        "My Account",
                        "Order Tracking",
                        "Wishlist",
                        "Terms",
                    ].map((item) => (
                        <li key={item} className="w-1/2 mb-2 cursor-pointer">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="flex-1 p-5 bg-[#fff8f8] md:bg-transparent">
                <h3 className="text-xl font-semibold mb-7">Contact</h3>

                <div className="flex items-center mb-5">
                    <Room className="mr-2" /> 622 Dixie Path , South
                    Tobinchester 98336
                </div>

                <div className="flex items-center mb-5">
                    <Phone className="mr-2" /> +1 234 56 78
                </div>

                <div className="flex items-center mb-5">
                    <MailOutline className="mr-2" /> contact@lama.dev
                </div>

                <img
                    className="w-1/2"
                    src="https://i.ibb.co/Qfvn4z6/payment.png"
                    alt="payment"
                />
            </div>
        </div>
    );
};

export default Footer;
