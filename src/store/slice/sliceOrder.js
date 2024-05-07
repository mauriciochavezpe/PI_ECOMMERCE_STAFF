import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [], // Tu array de productos inicial
  
  loading: false,
  loadingModal: false,
  error: "",
  value: 0,
};

var URL = process.env.REACT_APP_URL_ALL + "/products";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (filter) => {
    if (filter) {
      URL += `?category=${filter.category || ""}&brand=${
        filter.brand || ""
      }&name=${filter.name || ""}&minPrice=${filter.minPrice || ""}&maxPrice=${
        filter.maxPrice || ""
      }`;
    }
    const response = await axios(URL); // Use the relative path to your API endpoint
    const data = await response;
    return data.data;
  }
);

const productSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //actions

    changeLoading(state, action) {
      console.log(action.payload);
      // state.loading = action.payload;
      state = { ...state, loading: action.payload };
    },
    addFilter(state, action) {
      console.log(action.payload);
      state.filter = action.payload;
    },
    changeLoadingModal(state, action) {
        let aObj = state.products.filter((e) => e.id === action.payload);
        if (aObj.length == 1) {
          state.product = aObj[0];
        }
      state.loadingModal = !state.loadingModal;

      console.log(action.payload);
    },
    addProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      // Add user to the state array
      state.products = action.payload.products;
      state.loading = false;
    });

    builder.addCase(getAllProducts.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      console.log("Error", action);
      state.error = JSON.stringify(action);
    });
  },
});

export const { changeLoading, addFilter, changeLoadingModal, addProduct } =
  productSlice.actions;
export default productSlice.reducer;
