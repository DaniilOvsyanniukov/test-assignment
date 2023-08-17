import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../features/MainSlice';
import { Product } from '../types/Types';
import { RootState } from '../app/Store';

function useProducts() {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: RootState) => state.datastore.product);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/api/products')
      .then((response) => {
        dispatch(setProduct(response.data));
      })
      .catch((error) => {
        console.log('Ошибка при получении данных с сервера:', error);
      });
  }, [dispatch]);

  const filteredProducts = filter ? products.filter((product) => product.type === filter) : products;

  return {
    products: filteredProducts,
    filter,
    setFilter
  };
}

export default useProducts;
