// https://fakestoreapi.com/products

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Category {
  id: number;
  title: string;
  category: string;
}

export interface CategoryList {
  id: number;
  title: string;
  products: Product[];
}
