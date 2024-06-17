import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import cartReducer from "../reducers/cartReducer";

const mainReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
