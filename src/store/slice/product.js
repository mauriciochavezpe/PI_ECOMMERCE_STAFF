import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {  
products: [], // Tu array de productos inicial
product:{
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  quantity: "",
  image: null,
  id:""
},
filter:"",
loading: false,
error:"",
value:0 };

 
var URL = process.env.REACT_APP_URL_ALL+"/products";
 
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //actions
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
    changeLoading(state, action){
        state.loading = action.payload;
    },
    addFilter(state, action){
      state.filter = action.payload;
    },
    async getAllProducts(state, action){
      try {
        let filter = action?.payload || "";
        if(filter){
          URL+=`?category=${filter.category||""}&brand=${filter.brand||""}&name=${filter.name||""}&minPrice=${filter.minPrice||""}&maxPrice=${filter.maxPrice||""}`;
        }
        console.log(URL);
        //dispatch({ type: PRODUCT_LIST_REQUEST });
  
  
        const response = await axios(URL); // Use the relative path to your API endpoint
        const data = await response;
        state.products = data.data.products;
        /*
        dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data.data,
        });*/
      } catch (err) {
        state.error = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

        /*dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });*/
      }
    }
  },
});

export const { increment,decrement,incrementByAmount,changeLoading,getAllProducts } = productSlice.actions;
export default productSlice.reducer;
