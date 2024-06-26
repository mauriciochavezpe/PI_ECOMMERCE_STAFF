import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userList: [],
  userDataTemp: {},
  isLogin: false,
  loading: true,
  isUserAdmin: false,
  error: "",
  value: 0,
  report:""
};

let url = process.env.REACT_APP_URL_STAFF + "/users";
export const downloadReports = createAsyncThunk(
  "userNew/downloadReports",
  async () => {
    let sPath = process.env.REACT_APP_URL_STAFF + "/reports/users/excel";
    let config = {
      method: "GET",
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
export const getAllUser = createAsyncThunk("userNew/getAllUser", async () => {
  let config = {
    method: "GET",
    url,
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
    },
  };
  const response = await axios.request(config); // Use the relative path to your API endpoint
  const data = await response;
  return data;
});
export const updateMyUser = createAsyncThunk(
  "userNew/updateMyUser",
  async (action) => {
    let config = {
      method: "PATCH",
      url,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: action,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);
export const deleteMyUser = createAsyncThunk(
  "userNew/deleteMyUser",
  async (action) => {
    let config = {
      method: "DELETE",
      url,
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

const userNewSlice = createSlice({
  name: "userNew",
  initialState,
  reducers: {
    //actions
    updateMyuserData(state, action) {
      let aUserDataUpdate = action.payload;
      state.userData[aUserDataUpdate.key] = aUserDataUpdate.value;
    },
    IsLogin(state, action) {
      state.isLogin = action.payload;
      state.value = 100;
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
    builder.addCase(getAllUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.userList = action.payload.data.users;
      // state.getAllUserTemp = action.payload.data.user;
      state.isLogin = true;
      state.loading = false;
    });

    builder.addCase(getAllUser.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      state.loading = true;
      state.error = JSON.stringify(action);
    });
    //updateMyUser
    builder.addCase(updateMyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateMyUser.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("estamos por aquí");
      state.userData = action.payload.data.user;
      state.userDataTemp = action.payload.data.user;
      state.isLogin = true;
      state.loading = false;
    });

    builder.addCase(updateMyUser.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      state.loading = true;
      state.error = JSON.stringify(action);
    });
    //DELETEMyUser
    builder.addCase(deleteMyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteMyUser.fulfilled, (state, action) => {
      console.log("estamos por aquí DELETE");
      state.isLogin = true;
      state.loading = false;
    });

    builder.addCase(deleteMyUser.rejected, (state, action) => {
      // Add user to the state array
      state.loading = true;
      state.error = JSON.stringify(action);
    });

    
    //downloadFiles
    builder.addCase(downloadReports.pending, (state, action) => {
      // state.loading = true;
      state.showDetail = false;
      state.isDownloadFile = false;
    });
    
    builder.addCase(downloadReports.fulfilled, (state, action) => {
      // Add user to the state array
      state.statusOrder = action.payload.data.message;
      state.report = action.payload.data.report;
      state.successEvent = true;
      state.isDownloadFile = true;
    
      const handleDownload = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      
      handleDownload(state.report);
    
    });

    builder.addCase(downloadReports.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log("Error", action);
      state.error = JSON.stringify(action);
      state.showDetail = false;
      state.isDownloadFile = false;
    });
  },
});

export const { updateMyuserData, addFilter, addProduct, IsLogin } =
  userNewSlice.actions;
export default userNewSlice.reducer;
