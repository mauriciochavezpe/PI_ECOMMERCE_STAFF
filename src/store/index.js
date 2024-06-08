import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/sliceProduct";
import userLogin from "./slice/sliceUserLogin";
import orderSlice from "./slice/sliceOrder";
import chatgtpSlice from "./slice/sliceGPT";
import userNewSlice from "./slice/sliceUserNew";
import utilSlice from "./slice/sliceUtil";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "redux-persist/lib/storage"; // defaults to localStorage for web

let reducer = combineReducers({
  productSlice,
  userLogin,
  orderSlice,
  chatgtpSlice,
  userNewSlice,
  utilSlice
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);

export default store;
