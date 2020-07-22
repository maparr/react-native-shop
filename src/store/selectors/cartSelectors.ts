import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers/root';
import {selectAllProducts} from './categoriesList';

export const selectCart = (state: RootState) => state.cart;
export const selectProductsInCart = createSelector(
  selectCart,
  ({products}) => Object.values(products),
);
export const selectTotalPrice = createSelector(
    selectProductsInCart,
    (products) => products.reduce((acc, product) => ((product.amount * 25) + acc), 0),
);
export const selectTotalProductsInCart = createSelector(
    selectProductsInCart,
    (products) => products.reduce((acc, product) => product.amount + acc, 0),
);
