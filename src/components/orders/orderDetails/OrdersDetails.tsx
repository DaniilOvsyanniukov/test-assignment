import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/Store';
import {
  openConfirmPopup, setPopupTitle, setOrderIdForDeletion, setDeletionCommand, setProductIdForDeletion,
} from '../../../features/ConfirmPopupSlice';
import { toggleOrdersDetails } from '../../../features/MainSlice';
import { ReactComponent as CloseIcon } from '../../../img/cross.svg';
import { ReactComponent as BinIcon } from '../../../img/bin.svg';

import './OrderDetails.css';

const OrderDetails: React.FC = () => {
  const dispatch = useDispatch();
  const toggleOrderId = useSelector((state: RootState) => state.datastore.toggleOrderId);
  const order = useSelector((state: RootState) => state.datastore.order.find(order => order.id === toggleOrderId));
  if (!order){ 
    return null; } else { 
     return (
    <div className="order-details">
      <button
        className="order-details-close-button"
        onClick={() => {
          dispatch(toggleOrdersDetails(0));
        }}
      >
        <CloseIcon className="order-details-close-button-icon" />
      </button>
      <h2 className="order-details-title">{order.title}</h2>
      {order.products.map((product) => (
        <div key={product.id} className="order-details-product-card">
          <h3 className="order-details-product-title">{product.title}</h3>
          <p>{product.type}</p>
          <button
            className="order-details-delete-button"
            onClick={() => {
              dispatch(openConfirmPopup());
              dispatch(setPopupTitle(product.title));
              dispatch(setOrderIdForDeletion(toggleOrderId));
              dispatch(setProductIdForDeletion(product.id));
              dispatch(setDeletionCommand('productInOrder'));
            }}
          >
            <BinIcon className="order-details-delete-Icon" />
          </button>
        </div>
      ))}
    </div>
  );}

};

export default OrderDetails;
