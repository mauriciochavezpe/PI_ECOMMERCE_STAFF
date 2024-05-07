import { configureStore } from "@reduxjs/toolkit";
import product from "./slice/sliceProduct";

const store = configureStore({ reducer: { product }
 });

export default store;
