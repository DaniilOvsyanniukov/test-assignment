import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/Store';
import {
  openConfirmPopup, setOrderIdForDeletion, setPopupTitle, setDeletionCommand,
} from '../../../features/ConfirmPopupSlice';
import { toggleOrdersDetails } from '../../../features/MainSlice';
import { OrderCardProps } from '../../../types/Types';
import { formatDateOption1, formatDateOption2 } from '../../../utils/DateHelpers';

import { ReactComponent as BinIcon } from '../../../img/bin.svg';
import { ReactComponent as ListIcon } from '../../../img/list.svg';
import { ReactComponent as ArrowIcon } from '../../../img/chevron.svg';
import './OrderCard.css';

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
}) => {
  const dispatch = useDispatch();
  const isOrderDetailsToggle = useSelector((state: RootState) => state.datastore.isOrderDetailsToggle);
  const order = useSelector((state: RootState) => state.datastore.order.find(order => order.id === orderId));
  const toggleOrderId = useSelector((state: RootState) => state.datastore.toggleOrderId);

  if(!order){return null} else {
  const total = order?.products.reduce((prev, product) => {
    product.price.forEach((price) => {
      prev[price.symbol] = (prev[price.symbol] || 0) + price.value;
    });
    return prev;
  }, {} as Record<string, number>);
  
  const dateOption1 = formatDateOption1(order.date);
  const dateOption2 = formatDateOption2(order.date);
  
  return (
    <div className={`order-card ${isOrderDetailsToggle ? 'collapsed' : ''}`}>
      <div className="order-card-info">
        <h3 className="order-card-title">{order?.title}</h3>
        <button
          className="order-card-open-list-button"
          onClick={() => {
            dispatch(toggleOrdersDetails(order?.id));
          }}
        >
          <ListIcon className="order-card-open-list-icon" />
        </button>
        <div className="order-card-products-num">
          <p>{order.products.length}</p>
          <p>продукта</p>
        </div>
        <div className="order-card-date">
          <p>{dateOption1}</p>
          <p>{dateOption2}</p>
        </div>
        <div className="order-card-value">
          {Object.entries(total).map(([symbol, value]) => (
            <p key={symbol}>
              {symbol}
              :
              {' '}
              {value}
            </p>
          ))}
        </div>
        <button
          className="order-card-delete-button"
          onClick={() => {
            dispatch(openConfirmPopup());
            dispatch(setPopupTitle(order.title));
            dispatch(setOrderIdForDeletion(order.id));
            dispatch(setDeletionCommand('order'));
          }}
        >
          <BinIcon className="order-card-delete-Icon" />
        </button>
      </div>
      {isOrderDetailsToggle && toggleOrderId === order.id ? <div className="order-card-arrow-container"><ArrowIcon className="order-card-arrow-icon" /></div> : <div className="order-card-empty-container" />}
    </div>
  );
  }
  
};

export default OrderCard;
