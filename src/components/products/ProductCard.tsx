import React, { useState } from 'react';
import axios from 'axios';
import { Product } from './index';
import DeleteConfirmationPopup from '../popups/DeleteConfirmationPopup/DeleteConfirmationPopup';
import './ProductCard.css'
import { ReactComponent as BinIcon } from '../../img/bin.svg';

interface ProductCardProps {
  product: Product;
  onDelete: (productId: number) => void;
}



const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleConfirmDelete = async () => {
    try {
        const response = await axios.delete(`/api/products/${product.id}`);
        if (response.status === 200) {
           onDelete(product.id);
            console.log("Product successfully deleted");
        } else {
            console.error("Error occurred while deleting the product");
        }
    } catch (error) {
        console.error(error);
    }
    setShowDeletePopup(false);
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Returns format like 06/07/2023
  };
  return (
    <div className="product-card">
      <h3 className="product-title">{product.title}</h3>
      <p>{product.type}</p>
      <div className="product-card-date">
        <p>с {formatDate(product.guarantee.start)}</p>
        <p>по {formatDate(product.guarantee.end)}</p>
      </div>
      <div className="product-card-value"> 
      {product.price.map(price => (
        <p key={price.symbol}>
          {price.value} {price.symbol}
        </p>
      ))}
      </div>
      <p>Order: {product.order}</p>
      <button className="product-card-delete-button" onClick={() => {
                    setShowDeletePopup(true)
                }}>
                <BinIcon className="product-card-delete-Icon"/>
            </button>
            {showDeletePopup && <DeleteConfirmationPopup title={product.title} onCancel={() => setShowDeletePopup(false)} onConfirm={handleConfirmDelete} />}
    </div>
  );
}

export default ProductCard;
