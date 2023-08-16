import React from 'react';
import useProducts from '../../hooks/UseProducts';
import ProductCard from './productCard/ProductCard';
import './Psroducts.css';

const Products: React.FC = () => {
  const { products, filter, setFilter } = useProducts();
  return (
    <div className="products-container">
      <div className="products-title">
        <h1>
          Продукты / {products.length}
        </h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Все</option>
          <option value="Monitors">Мониторы</option>
        </select>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </div>
  );
};

export default Products;
