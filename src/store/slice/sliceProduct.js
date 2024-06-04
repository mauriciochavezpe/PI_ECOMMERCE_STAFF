import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [], // Tu array de productos inicial
  product: [],
  filter: "",
  loading: false,
  loadingModal: false,
  error: "",
  value: 0,
  ItemSelected: [],
};

var URL = process.env.REACT_APP_URL_STAFF + "/products";

export const getAllProducts = createAsyncThunk(
  "productSlice/getAllProducts",
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

export const deleteProducts = createAsyncThunk(
  "userLogin/deleteProducts",
  async (id) => {
    let sPath = URL + +"/" + id;
    let config = {
      method: "DELETE",
      url: sPath,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

export const createProducts = createAsyncThunk(
  "orderSlice/createProducts",
  async (body) => {
    let config = {
      method: "POST",
      url: URL,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: body,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

export const updateProducts = createAsyncThunk(
  "orderSlice/updateProducts",
  async (body) => {
    let sPath = URL + "/" + body.id;
    let config = {
      method: "POST",
      url: sPath,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: body,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

export const createImg = createAsyncThunk(
  "orderSlice/createImg",
  async (body) => {
    let sPath = URL + +"/" + body.id + "/image";

    let config = {
      method: "POST",
      url: sPath,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: body,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    //actions
    deleteItemToShop(state, action) {
      console.log("aaa");
      let id = action.payload;
      let arrFilter = state.ItemSelected.filter((product) => product.id != id);
      state.ItemSelected = arrFilter;
    },
    addItemToShop2(state, action) {
      const productId = action.payload;
      const productToAdd = state.products.find(
        (product) => product.id === productId
      );
      const existingProductIndex = state.ItemSelected.findIndex(
        (product) => product.id === productId
      );

      if (existingProductIndex === -1) {
        state.ItemSelected.push({
          ...productToAdd,
          qtySelect: 1,
        });
      } else {
        state.ItemSelected = state.ItemSelected.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              qtySelect: product.qtySelect + 1,
            };
          }
          return product;
        });
      }
    },
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

export const {
  changeLoading,
  addFilter,
  changeLoadingModal,
  addProduct,
  addItemToShop2,
  deleteItemToShop,
} = productSlice.actions;
export default productSlice.reducer;
