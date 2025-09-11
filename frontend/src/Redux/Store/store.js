// Redux/Store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Make sure this path is correct
import cartReducer from './cartSlice';
import restaurantReducer from './restaurantSlice';
import orderReducer from './orderSlice'; // Import the order slice reducer

export const store = configureStore({
 reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurants: restaurantReducer,
    orders: orderReducer, // Add this line
  },
});
