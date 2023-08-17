import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/Store';
import axios from 'axios';
import { closeConfirmPopup } from '../../../features/ConfirmPopupSlice';
import { deleteStoreOrder, deleteStoreProduct, deleteProductFromOrder } from '../../../features/MainSlice';


import './DeleteConfirmationPopup.css';
import { ReactComponent as CloseIcon } from '../../../img/cross.svg';
import { ReactComponent as BinIcon } from '../../../img/bin.svg';

const DeleteConfirmationPopup: React.FC = () => {
  const dispatch = useDispatch();
  const OrderId = useSelector((state: RootState) => state.confirmPopup.orderId);
  const ProductId = useSelector((state: RootState) => state.confirmPopup.productId);
  const deletionCommand = useSelector((state: RootState) => state.confirmPopup.deletionCommand);
  const title = useSelector((state: RootState) => state.confirmPopup.title);

  const deleteOrder = async () => {
    try {
      const response = await axios.delete(process.env.REACT_APP_SERVER_URL + `/api/orders/${OrderId}`);
      if (response.status === 200) {
        dispatch(deleteStoreOrder(OrderId));
        console.log('Order successfully deleted');
      } else {
        console.error('Error occurred while deleting the order');
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(closeConfirmPopup());
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(process.env.REACT_APP_SERVER_URL + `/api/products/${ProductId}`);
      if (response.status === 200) {
        dispatch(deleteStoreProduct(ProductId));
        console.log('Product successfully deleted');
      } else {
        console.error('Error occurred while deleting the product');
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(closeConfirmPopup());
  };

  const deleteProductInOrder = async () => {
    try {
      const response = await axios.delete(process.env.REACT_APP_SERVER_URL + `/api/${OrderId}/products/${ProductId}`);
      if (response.status === 200) {
        dispatch(deleteProductFromOrder({ orderId: OrderId, productId: ProductId }));
        console.log('Product successfully deleted');
      } else {
        console.error('Error occurred while deleting the product');
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(closeConfirmPopup());
  };
  const handleDelete = () => {
    switch (deletionCommand) {
      case 'order':
        deleteOrder();
        break;
      case 'product':
        deleteProduct();
        break;
      case 'productInOrder':
        if (OrderId && ProductId) {
          deleteProductInOrder();
        } else {
          console.error('Both orderId and productId are required for deleting product in order');
        }
        break;
      default:
        console.error('Invalid deletion command');
    }
  }
 

  return (
    <div className="popup-overlay" onClick={() => dispatch(closeConfirmPopup())}>
      <div className="delete-confirmation-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-button" onClick={() => dispatch(closeConfirmPopup())}>
          <CloseIcon className="popup-close-button-icon" />
        </button>
        <div className="delete-confirmation-content">
          <h2 className="delete-confirmation-message">Вы действительно хотите удалить этот приход?</h2>
          <h3 className="delete-confirmation-title">{title}</h3>
        </div>
        <div className="popup-buttons">
          <button className="cancel-button" onClick={() => dispatch(closeConfirmPopup())}>Отменить</button>
          <button className="delete-button" onClick={handleDelete}>
            <BinIcon className="delete-button-icon" />
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
