import React, { useEffect } from 'react';
import { useProduct } from '../hook/useProduct.ts';
import { useAppSelector } from '../../../app/app.hooks.ts';

export default function Dashboard() {
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useAppSelector(
    (state) => state.product.sellerProducts
  );

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  console.log(sellerProducts);

  return <div>Dashboard</div>;
}
