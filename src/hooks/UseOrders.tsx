import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/Store';
import { setOrder } from '../features/MainSlice';

function useOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.datastore.order);
  const isOrderDetailsToggle = useSelector((state: RootState) => state.datastore.isOrderDetailsToggle);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/api/orders')
      .then((response) => {
        dispatch(setOrder(response.data));
      })
      .catch((error) => {
        console.log('Ошибка при получении данных с сервера:', error);
      });
  }, [dispatch]);

  return {
    orders,
    isOrderDetailsToggle
  };
}

export default useOrders;
