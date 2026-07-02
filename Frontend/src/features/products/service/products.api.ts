import axios from 'axios';

const productApiInstance = axios.create({
  baseURL: '/api/v1/products',
  withCredentials: true,
});

export async function createProduct(formData: FormData) {
  const response = await productApiInstance.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function getSellerProducts() {
  const response = await productApiInstance.get('/seller');
  return response.data;
}

export async function getAllProducts() {
  const response = await productApiInstance.get('/');
  return response.data;
}

export async function getProductDetails(productId: string) {
  const response = await productApiInstance.get(`/detail/${productId}`);
  return response.data;
}
