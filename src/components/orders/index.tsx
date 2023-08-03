import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import axios from 'axios';
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
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export default Orders;