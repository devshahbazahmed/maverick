import { createProduct, getSellerProducts } from '../service/products.api.ts';
import { useDispatch } from 'react-redux';
import { setSellerProducts } from '../state/product.slice.ts';

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData: FormData) {
    const data = await createProduct(formData);
    return data.product;
    // dispatch(setSellerProducts(data.products));
  }

  async function handleGetSellerProducts() {
    const data = await getSellerProducts();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
  };
};
