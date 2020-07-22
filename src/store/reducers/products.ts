import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../common';
import {AppThunk} from './root';
import {getProducts} from '../../services';

interface ProductInitialState {
  products: Product[];
}

let initialState: ProductInitialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Product[]>) {
      state.products = [...action.payload];
    },
  },
});

export const fetchProducts = (): AppThunk => async (dispatch) => {
  const products = await getProducts();
  dispatch(set(products));
};

export const {set} = productsSlice.actions;

export const ProductsReducer = productsSlice.reducer;
