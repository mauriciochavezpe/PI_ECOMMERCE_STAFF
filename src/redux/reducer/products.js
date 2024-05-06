import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    case "decrement":
      return { ...state, value: state.value - 1 };
    case "incrementByAmount":
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
};

const reducer = {
    todos: todosReducer,
    visibility: visibilityReducer,
  }

 
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    counterReducer
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action) {
    //   state.value += action.payload
    // },
  },
});

export const { increment } = productSlice.actions;
export default productSlice.reducer;
