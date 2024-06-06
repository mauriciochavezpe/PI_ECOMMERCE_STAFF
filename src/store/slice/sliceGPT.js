import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  conversations: [], // Tu array de productos inicial
  users: [],
  filter: "",
  loading: false,
  loadingModal: false,
  error: "",
  value: 0,
  status:"succeeded"
};

var URL = process.env.REACT_APP_URL_STAFF + "/conversations?userGroup=Admins";

export const getAllConversations = createAsyncThunk(
  "product/getAllConversations",
  async () => {
    let config = {
        method: "GET",
        url:URL,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
        },
      };
      const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data.data;
  }
);

const chatgtpSlice = createSlice({
  name: "chatgpt",
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
    builder.addCase(getAllConversations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllConversations.fulfilled, (state, action) => {
      // Add user to the state array
      state.conversations = action.payload.conversations;
      state.loading = false;
    });

    builder.addCase(getAllConversations.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      console.log("Error", action);
      state.error = JSON.stringify(action);
    });
  },
});

export const { changeLoading, addFilter, changeLoadingModal, addProduct } =
  chatgtpSlice.actions;
export default chatgtpSlice.reducer;
