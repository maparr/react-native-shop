import {combineReducers} from '@reduxjs/toolkit';
import {Action} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {ProductsReducer} from './products';
import CartReducer from './cart';

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default rootReducer;
