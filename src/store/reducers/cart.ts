import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from "../../common/types";
import {act} from "react-test-renderer";

export type ProductPayload = {product: Product, amount: number};
type ProductsList = Record<number, ProductPayload >;

interface CartInitialState {
  products: ProductsList;
}

let initialState: CartInitialState = {
  products: {},
};

const removeFromProductList = (state: CartInitialState, {payload}: PayloadAction<Product>) => {
  const list = Object.values(state.products).filter(({product}) => product.id !== payload.id)

  if(!list.length) {
    return {
      ...state,
      products: {}
    }
  }

  return {
    ...state,
    // transform
    products: list.reduce((acc: ProductsList, product) => {
      acc[product.product.id] = product;
      return acc;
    }, {})
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, {payload: {product, amount}}: PayloadAction<{product: Product, amount: number}>) {
      const { id } = product;

      state.products[id] = {
        product: {...product},
        amount: amount
      }

      return state;
    },
    increase(state, {payload}: PayloadAction<Product>) {
      const { id } = payload;

      if(state.products[id]){
        state.products[id].amount += 1;

        return state;
      }

      state.products[id] = {
        product: {...payload},
        amount: 1
      }

      return state;
    },
    decrease(state, action: PayloadAction<Product>) {
      const { id } = action.payload;

      if(!state.products[id]) {
        return state;
      }

      // if product has limit
      if(state.products[id].amount === 1) {
        return removeFromProductList(state, action)
      }

      return {
        ...state,
        products: {
          ...state.products,
          [id]: {
            product: action.payload,
            amount: state.products[id].amount - 1
          }
        },
      }
    },
    remove(state, payload: PayloadAction<Product>) {
      return removeFromProductList(state, payload);
    },
    clean(state) {
      state.products = {};
    },
  },
});

export const {add, remove, clean, increase, decrease} = cartSlice.actions;

export default cartSlice.reducer;
