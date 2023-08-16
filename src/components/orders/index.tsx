import React from 'react';
import { useDispatch } from 'react-redux';
import {  openAlertPopup } from '../../features/MainSlice';
import OrderCard from './orderCard/OrderCard';
import OrderDetails from './orderDetails/OrdersDetails';
import useOrders from '../../hooks/UseOrders';
import { ReactComponent as PlusIcon } from '../../img/plus.svg';
import './Osrders.css';

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, isOrderDetailsToggle } = useOrders();

  return (
    <div className="orders-container">
      <div className="orders-title">
        <button className="orders-green-button" onClick={() => dispatch(openAlertPopup())}>
          <PlusIcon className="orders-plus-Icon" />
        </button>
        <h1>
          Приходы / {orders.length}
        </h1>
      </div>

      {orders.map((order) => (
        <OrderCard key={order.id} orderId={order.id} />
      ))}
      {isOrderDetailsToggle
            && <OrderDetails />}
    </div>
  );
};

export default Orders;
