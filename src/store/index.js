import { configureStore } from "@reduxjs/toolkit";
import product from "./slice/sliceProduct";
import userLogin from "./slice/sliceUserLogin";

const store = configureStore({ reducer: { product, userLogin }
 });

export default store;
