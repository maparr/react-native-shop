import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers/root';
import {selectAllProducts} from './categoriesList';

export const selectCart = (state: RootState) => state.cart;
export const selectProductsInCart = createSelector(
  selectCart,
  selectAllProducts,
  ({products: productIdsInCart}, {products}) =>
    products.filter(
      ({id}) =>
        productIdsInCart.findIndex(
          (selectedProductId) => selectedProductId === id,
        ) !== -1,
    ),
);

// export const selectAllProducts = (state: RootState) => state.products;
// export const selectCategories = (state: RootState) => state.products;
// export const selectProductsInCategory = createSelector(
//     selectAllProducts,
//     ({products}) => products
// );
