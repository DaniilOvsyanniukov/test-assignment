import React, { useState } from 'react';
import axios from 'axios';
import { Order, Product } from './index'
import DeleteConfirmationPopup from '../popups/DeleteConfirmationPopup/DeleteConfirmationPopup';

import { ReactComponent as CloseIcon } from '../../img/cross.svg'; 
import { ReactComponent as BinIcon } from '../../img/bin.svg';

import './OrderDetails.css';
interface OrderDetailsProps {
    order: Order;
    onClose: () => void;
}


const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [products, setProducts] = useState<Product[]>(order.products);

    const handleDeleteProduct = async (orderId: number, productId: number) => {
        try {
            const response = await axios.delete(`api/${orderId}/products/${productId}`);
            if (response.status === 200) {
                setProducts(products => products.filter(products => products.id !== productId));
                console.log("Product successfully deleted");
            } else {
                console.error("Error occurred while deleting the product");
            }
        } catch (error) {
            console.error(error);
        }
        setShowDeletePopup(false)
    };
    return (
        <div className="order-details">
            <button className="order-details-close-button" onClick={onClose}>
                   <CloseIcon className="order-details-close-button-icon" />
                </button>
            <h2 className="order-details-title">{order.title}</h2>
            {products.map(product => (
                <div key={product.id} className="order-details-product-card">
                       <h3 className="order-details-product-title">{product.title}</h3>
                       <p>{product.type}</p>
                       <button className="order-details-delete-button" onClick={() => setShowDeletePopup(true)}>
                           <BinIcon className="order-details-delete-Icon"/>
                       </button>
                       {showDeletePopup && <DeleteConfirmationPopup title={product.title} onCancel={() => setShowDeletePopup(false)} onConfirm={() => handleDeleteProduct(order.id, product.id)} />}
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
