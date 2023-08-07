import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './products.css';

export interface Product {
  id: number;
  title: string;
  type: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];
  order: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');

  const handleDeleteProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
}

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = filter ? products.filter(product => product.type === filter) : products;

  return (
    <div className="products-container">
      <div className='products-title'>
        <h1>Продукты / {products.length}</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Все</option>
          <option value="Monitors">Мониторы</option>
        </select>
      </div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
      ))}
    </div>
  );
};

export default Products;
