import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import axios from 'axios';
import AlertPopup from '../popups/alertPopup/alertPopup';
import { ReactComponent as PlusIcon } from '../../img/plus.svg';
import './orders.css';

interface Order {
    id: number;
    title: string;
    date: string;
    products: Product[];
}

interface Product {
    id: number;
    serialNumber: number;
    isNew: number;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: {
        start: string;
        end: string;
    };
    price: [
        { value: number, symbol: string, isDefault: number }
    ];
    order: number;
    date: string;
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const handleDeleteOrder = (orderId: number) => {
        setOrders(orders => orders.filter(order => order.id !== orderId));
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.log('Ошибка при получении данных с сервера:', error);
            });
    }, []);

    return (
        <div className="orders-container">
            <div className="orders-title">
                <button className="orders-green-button" onClick={handleOpenPopup}>
                   <PlusIcon className="orders-plus-Icon"/>
                </button>
                <h1>Приходы / {orders.length}</h1>
            </div>
            
            {orders.map(order => (
                <OrderCard key={order.id} order={order} onDelete={handleDeleteOrder} />
            ))}
            {showPopup && <AlertPopup message="Эта функция находится в разработке" delay={3000} onHide={handleClosePopup}/>}
        </div>
    );
};

export default Orders;
