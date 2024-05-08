import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
  isLogin:false,
  loading: false,
  error: "",
  value: 0,
};

var url = process.env.REACT_APP_URL_ALL + "/user";
export const getMyUser = createAsyncThunk(
    "userLogin/getMyUser",
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
      return data;
    }
  );

const productSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    //actions
    isLogin(state, action) {
      state.isLogin = action.payload;
    },
    addFilter(state, action) {
      console.log(action.payload);
      state.value = action.payload;
    },
   
    addProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyUser.fulfilled, (state, action) => {
      // Add user to the state array
      debugger;
      state.products = action.payload.user;
      state.isLogin = true;
      state.loading = false;
    });

    builder.addCase(getMyUser.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      state.error = JSON.stringify(action);
    });
  },
});

export const { changeLoading, addFilter, changeLoadingModal } =
  productSlice.actions;
export default productSlice.reducer;