// import axios from "axios";

// // const BASE_URL = "https://shape-backend.onrender.com/api/";
// // const BASE_URL =
// //   process.env.NODE_ENV === "production"
// //     ? "https://shape-backend.onrender.com/api/"
// //     : "http://localhost:8081/api";
// const BASE_URL = "http://localhost:8081/api";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzQzNjVkYjQ5MDZiYmQzOGM2N2FiNiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Njg2NzYxMDAsImV4cCI6MTY2ODkzNTMwMH0.jhOjtkCzdJMqp3Fd9ErUtThTi5B2zlvVTGO8ebaDTt8";
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });
//

import axios from "axios";

// 1. Define the type for the User object (based on previous context)
interface User {
    accessToken?: string;
    // ... other user fields
}

// 2. Define the type for the Token
type AuthToken = string | null;

const BASE_URL: string =
    process.env.NODE_ENV === "production"
        ? "https://shape-backend.onrender.com/api/"
        : "http://localhost:8081/api";

// --- Type Error Fix Starts Here ---

const localStorageRoot = localStorage.getItem("persist:root");

let currentUser: User | null = null;
let TOKEN: AuthToken = null;

if (localStorageRoot) {
    // 3. Safely parse the root state only if the string exists
    const parsedRoot = JSON.parse(localStorageRoot);

    // 4. Safely parse the 'user' sub-string if it exists
    if (parsedRoot.user) {
        // The user property is still a stringified JSON object, so it needs another parse
        currentUser = JSON.parse(parsedRoot.user).currentUser as User;
        TOKEN = currentUser?.accessToken || null; // Safely extract token, default to null
    }
}

// --- Type Error Fix Ends Here ---

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// 5. Create userRequest, safely handling the token
export const userRequest = axios.create({
    baseURL: BASE_URL,
    // Ensure TOKEN is not null before using it in the header.
    // If TOKEN is null, the header might be omitted or set to an empty string.
    headers: {
        ...(TOKEN ? { token: `Bearer ${TOKEN}` } : {}),
    },
});

/*
Alternative for headers (if you prefer setting the token as "Bearer null" or "Bearer undefined"
instead of omitting the header when the user is logged out):

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN || ""}` },
});

*/
