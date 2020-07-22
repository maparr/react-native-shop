import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartInitialState {
  products: Array<number>;
}

let initialState: CartInitialState = {
  products: [3, 4, 5],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<number>) {
      state.products.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (productID) => productID !== action.payload,
      );
    },
    clean(state) {
      state.products = [];
    },
  },
});

export const {add, remove, clean} = cartSlice.actions;

export default cartSlice.reducer;
