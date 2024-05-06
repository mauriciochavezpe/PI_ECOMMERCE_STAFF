import { configureStore } from "@reduxjs/toolkit";
import product from "./slice/product";

const store = configureStore({ reducer: { product } });

export default store;
