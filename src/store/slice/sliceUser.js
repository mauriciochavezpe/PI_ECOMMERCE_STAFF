import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
  isLogin:false,
  loading: false,
  loadingModal: false,
  error: "",
  value: 0,
};

var url = process.env.REACT_APP_URL_ALL + "/user";
export const getMyUser = createAsyncThunk(
    "user/getMyUser",
    async () => {
    let config = {
        method:"GET",
        url,
        headers:{
            "Authorization": JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2
        }
    }
      const response = await axios.request(config); // Use the relative path to your API endpoint
      const data = await response;
      return data.data;
    }
  );

const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //actions

    isLogin(state, action) {
      state.isLogin = action.payload;
    },
    addFilter(state, action) {
      console.log(action.payload);
      state.filter = action.payload;
    },
    changeLoadingModal(state, action) {
      // state.loadingModal = !action.payload.loadingModal;
      // state.loadingModal = !action.payload.loadingModal;
      // if (typeof action.payload == String) {
        let aObj = state.products.filter((e) => e.id === action.payload);
        if (aObj.length == 1) {
          state.product = aObj[0];
        }
      // }
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