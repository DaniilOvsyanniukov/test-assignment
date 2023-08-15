import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../features/MainSlice';
import { RootState } from '../app/Store';

function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.datastore.product);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => dispatch(setProduct(data)));
  }, [dispatch]);

  const filteredProducts = filter ? products.filter((product) => product.type === filter) : products;

  return {
    products: filteredProducts,
    filter,
    setFilter
  };
}

export default useProducts;
