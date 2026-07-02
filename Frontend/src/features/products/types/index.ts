export type CreateProductFormData = {
  title: string;
  description: string;
  priceAmount: number;
  priceCurrency: string;
};

export interface ProductImage {
  fileId: string;
  url: string;
}

export interface ProductPrice {
  amount: number;
  currency: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: ProductPrice;
  images: ProductImage[];
  seller: string;
  createdAt: string;
  updatedAt: string;
}
