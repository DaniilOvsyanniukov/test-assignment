import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as BinIcon } from '../../img/bin.svg';
import { ReactComponent as ListIcon } from '../../img/list.svg';
import DeleteConfirmationPopup from '../popups/DeleteConfirmationPopup/DeleteConfirmationPopup';
import './orderCard.css';

interface Order {
    id: number;
    title: string;
    date: string;
    products: Product[];
}

interface Product {
    id: number;
    price: Currency[];
}

interface Currency {
    value: number;
    symbol: string;
}

interface OrderCardProps {
    order: Order;
    onDelete: (id: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onDelete }) => {
    const total = order.products.reduce((prev, product) => {
        product.price.forEach(price => {
            prev[price.symbol] = (prev[price.symbol] || 0) + price.value;
        });
        return prev;
    }, {} as Record<string, number>);

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDelete = () => {
        setShowDeletePopup(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`api/orders/${order.id}`);
            if (response.status === 200) {
                onDelete(order.id);
                console.log("Order successfully deleted");
            } else {
                console.error("Error occurred while deleting the order");
            }
        } catch (error) {
            console.error(error);
        }
        setShowDeletePopup(false);
    };

    const formattedDate = new Date(order.date);
    const dateOption1 = formattedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }); // 04 / 10
    const dateOption2 = formattedDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }); // 04 / Сен / 2019

    return (
        <div className="order-card">
            <h2 className="order-card-title">{order.title}</h2>
            <button className="order-card-open-list-button">
                <ListIcon  className="order-card-open-list-icon"/>
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
                   <p key={symbol}>{symbol}: {value}</p>
                ))}
            </div>
            <button className="order-card-delete-button" onClick={handleDelete}>
                <BinIcon className="order-card-delete-Icon"/>
            </button>
            {showDeletePopup && <DeleteConfirmationPopup title={order.title} onCancel={() => setShowDeletePopup(false)} onConfirm={handleConfirmDelete} />}
        </div>
    );
};

export default OrderCard;
