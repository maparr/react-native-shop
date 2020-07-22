import {Product} from '../common';

const DOMAIN = 'https://fakestoreapi.com';

export const get = <T>(url: string) =>
  fetch(url, {
    method: 'GET',
  }).then(
    (response): Promise<T> => {
      return response.json();
    },
  );

export const getProducts = (): Promise<Product[]> => {
  return get<Product[]>(`${DOMAIN}/products`);
};
