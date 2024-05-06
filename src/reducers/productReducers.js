import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL, 
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_CLEAR_MESSAGE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_HIDE_MESSAGE,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_FILL,
  PRODUCT_EDIT_SUCCESS
} from "../constants/productConstants";
 

const initialState = {
  productos: [], // Tu array de productos inicial
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
  loading: true
};

const actionTypes = {
  confirm: "CONFIRM",
  WRITE: "WRITE",
  PRINT:"PRINT",
  INCREMENT:"INCREMENT",
  DECREMENT:"DECREMENT"
};


const URL =
"https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products";



export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        pages: payload.pages || 1,
        page: payload.page || 1,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        products: state.products.filter(
          (product) => product.id !== payload.id
        ),
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        products: [...state.products,payload],
      };
    case PRODUCT_EDIT_SUCCESS:
      let newProducts = state.products.filter(e=>e.id !== payload.id).concat(payload)
      return {
        ...state,
        message: payload.message,
        products: newProducts,
      };
    case PRODUCT_DELETE_CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_DETAILS_FILL:
      state.product = payload;
      return {...state};
      default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state={}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      /*
      let newProducts= productos.filter(e => e.id != payload.id)
      newProducts.push(payload)*/

      return { loading: false, success: true, product: payload};
    case PRODUCT_UPDATE_HIDE_MESSAGE:
      return {
        ...state,
        success: false,
      };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return {
        ...state,
        product: {},
      };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const createproduct1 = (state = {product:{}}, action)=>{
  switch (action.type) {
    case "FILL":
      return {...state.product,...action.payload}
    default:
      return {...state};
  }
}
//los reduce reciben 2
export const createImage = (state = initialState, action) => {
  const { type, payload } = action;
  //console.log("state21", state);
  switch (type) {
    case "IMG_FULL":
      return {...state, ...action.payload}
    default:
      return state;
  }
};
 