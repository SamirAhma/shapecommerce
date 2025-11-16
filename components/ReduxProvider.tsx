// components/ReduxProvider.tsx

"use client";
import { PropsWithChildren } from "react"; // <-- Import PropsWithChildren
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";

// 💡 Pass 'unknown' instead of {}
export function ReduxProvider({ children }: PropsWithChildren<unknown>) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

// NOTE: If you are using Redux Persist, you must uncomment the PersistGate and import related files.
