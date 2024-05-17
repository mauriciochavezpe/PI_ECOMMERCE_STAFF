import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/sliceProduct";
import userLogin from "./slice/sliceUserLogin";
import orderSlice from "./slice/sliceOrder";

const store = configureStore({ reducer: { productSlice, userLogin, orderSlice } });

export default store;
