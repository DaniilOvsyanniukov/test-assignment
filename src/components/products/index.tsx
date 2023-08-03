import React from 'react';
import GroupOfProducts from './GroupOfProducts';
import ProductCard from './ProductCard';

function Products() {
  return (
    <div className="products">
      <GroupOfProducts />
      <ProductCard />
    </div>
  );
}

export default Products;