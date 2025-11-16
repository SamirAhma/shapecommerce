import { createSlice } from "@reduxjs/toolkit";
interface Product {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories: string[];
    size: string;
    color: string;
    price: number;
    inStock: boolean;
    createdAt: string; // Typically a string representing an ISO 8601 date
    updatedAt: string; // Typically a string representing an ISO 8601 date
    __v: number; // Mongoose version key

    // The quantity property is often added when the product is in a shopping cart
    quantity: number;
}
export interface CartState {
    products: Product[];
    quantity: number; // The total number of unique product *types* in the cart
    total: number; // The cumulative price of all items
}
// Initial State based on the defined type
const initialState: CartState = {
    products: [],
    quantity: 0,
    total: 0,
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
