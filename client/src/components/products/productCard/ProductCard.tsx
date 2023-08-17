import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/Store';
import {
  openConfirmPopup, setProductIdForDeletion, setPopupTitle, setDeletionCommand,
} from '../../../features/ConfirmPopupSlice';
import { ProductCardProps } from '../../../types/Types';
import { formatDateOption3 } from '../../../utils/DateHelpers';
import './ProductCard.css';
import { ReactComponent as BinIcon } from '../../../img/bin.svg';

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.datastore.product.find(product => product.id === productId))
  if(!product){return null} else {
  return (
    <div className="product-card">
      <h3 className="product-title">{product.title}</h3>
      <p>{product.type}</p>
      <div className="product-card-date">
        <p>
          с {formatDateOption3(product.guarantee.start)}
        </p>
        <p>
          по {formatDateOption3(product.guarantee.end)}
        </p>
      </div>
      <div className="product-card-value">
        {product.price.map((price) => (
          <p key={price.symbol}>
            {price.value}
            {' '}
            {price.symbol}
          </p>
        ))}
      </div>
      <p>
        Order:
        {product.order}
      </p>
      <button
        className="product-card-delete-button"
        onClick={() => {
          dispatch(openConfirmPopup());
          dispatch(setPopupTitle(product.title));
          dispatch(setProductIdForDeletion(productId));
          dispatch(setDeletionCommand('product'));
        }}
      >
        <BinIcon className="product-card-delete-Icon" />
      </button>
    </div>
  );
};};

export default ProductCard;
