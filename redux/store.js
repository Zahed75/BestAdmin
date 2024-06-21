import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice";
import ordersReducer from "@/redux/slice/orderSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store;
