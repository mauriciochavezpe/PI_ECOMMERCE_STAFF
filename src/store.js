import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  deleteProductReducer,
  productCreateReviewReducer,
  createproduct1,
  createImage,
} from "./reducers/productReducers";

import { category_list
} from "./reducers/categoryReducers";
const initialState = {
  productCreate: { product: {} },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: deleteProductReducer,
  productCreateReview: productCreateReviewReducer,
  createproduct1,
  createImage,
  categoryList:category_list
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const middleware = [thunkMiddleware];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
//const store = createStore(reducer, initialState)

export default store;
