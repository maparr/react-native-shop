import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers/root';
import {CategoryList} from 'src/common';

type Category = Record<string, CategoryList>;

export const selectAllProducts = (state: RootState) => state.products;
export const selectCategories = createSelector(
  selectAllProducts,
  ({products}) => {
    const categories = products.reduce((acc: Category, product) => {
      const {category, id} = product;

      if (acc[category]) {
        acc[category].products.push(product);
        return acc;
      }

      acc[category] = {
        id,
        title: category,
        products: [product],
      };

      return acc;
    }, {});

    return Object.values(categories);
  },
);

export const selectProductsInCategory = createSelector(
  selectCategories,
  (categories) => {
    return categories;
  },
);
