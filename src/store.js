import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware  from 'redux-thunk'
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  deleteProductReducer,
  productCreateReviewReducer,
  test2,
  createproduct1
} from './reducers/productReducers'


/*
const initialState = {
  test:123
}*/

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: deleteProductReducer,
  productCreateReview: productCreateReviewReducer,
  createproduct1,
  test2:test2
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

 const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}


const middleware = [thunkMiddleware]

 const store = createStore(reducer, /*initialState,*/ applyMiddleware(...middleware))
//const store = createStore(reducer, initialState)

export default store
