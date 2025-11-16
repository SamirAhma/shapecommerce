import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
    return (
        <div className="h-[60vh] bg-[#fcf5f5] flex flex-col items-center justify-center">
            <h1 className="text-[70px] mb-5">Newsletter</h1>

            <p className="text-[24px] font-light mb-5 text-center md:text-left">
                Get timely updates from your favorite products.
            </p>

            <div className="w-1/2 h-10 bg-white flex justify-between border border-gray-300 md:w-4/5">
                <input
                    placeholder="Your email"
                    className="flex-[8] pl-5 border-none outline-none"
                />
                <button className="flex-[1] bg-teal-600 text-white flex items-center justify-center">
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
