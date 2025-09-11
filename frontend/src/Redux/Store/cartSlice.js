import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(i => i._id === action.payload._id);
      if (existingItem) existingItem.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    clearCart: state => { state.items = []; state.total = 0; }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
