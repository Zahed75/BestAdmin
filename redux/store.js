import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice";
import ordersReducer from "@/redux/slice/orderSlice";
import usersReducer from "@/redux/slice/usersSlice";
import authReducer from "@/redux/slice/authSlice";
import outletsReducer from "@/redux/slice/outletSlice";
import couponsReducer from "@/redux/slice/couponSlice";
import customersReducer from "@/redux/slice/customersSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    auth: authReducer,
    outlets: outletsReducer,
    coupons: couponsReducer,
    customer: customersReducer,
  },
});

export default store;
