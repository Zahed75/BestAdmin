import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice";
import ordersReducer from "@/redux/slice/orderSlice";
import usersReducer from "@/redux/slice/usersSlice";
import authReducer from "@/redux/slice/authSlice";
import outletsReducer from "@/redux/slice/outletSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    auth: authReducer,
    outlets: outletsReducer,
  },
});

export default store;
