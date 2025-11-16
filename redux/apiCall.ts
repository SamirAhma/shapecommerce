import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import { publicRequest } from "@/lib/requestMethod";
import { AxiosResponse } from "axios"; // Used to type the API response

// Assuming the types defined above (User, AuthPayload, AppDispatch) are imported or defined here.
// Define the shape of the data expected back from the API
interface User {
    _id: string;
    username: string;
    email: string;
    accessToken?: string;
    // ... any other user properties returned upon login/registration
}

// Define the shape of the data passed to the 'login' action function
interface AuthPayload {
    username?: string;
    email?: string;
    password: string;
    type: "login" | "register"; // Literal type for clarity
}

// Define the Redux Dispatch type (simplified for demonstration)
type AppDispatch = (action: any) => void;
export const login = async (
    dispatch: AppDispatch,
    user: AuthPayload,
): Promise<void> => {
    // 1. Dispatch start action (sets isFetching = true)
    dispatch(loginStart());

    try {
        // Define the type of the expected API response
        let res: AxiosResponse<User>;

        if (user.type === "login") {
            // API Call 1: Login
            const loginData = {
                username: user.username,
                password: user.password,
            };
            res = await publicRequest.post("/auth/login", loginData);

            // 2. Dispatch success with returned user data
            dispatch(loginSuccess(res.data));
        } else if (user.type === "register") {
            // API Call 2: Register
            const registerData = {
                username: user.username,
                email: user.email,
                password: user.password,
            };
            res = await publicRequest.post("/auth/register", registerData);

            // 2. Dispatch success with returned user data (assuming registration returns the user object)
            dispatch(loginSuccess(res.data));
        }
        // else block is empty, no action taken if type is neither 'login' nor 'register'
    } catch (err) {
        // 3. Dispatch failure action (sets isFetching = false, error = true)
        console.log(err);
        dispatch(loginFailure());
    }
};
