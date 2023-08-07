import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetails from './OrdersDetails'; 
import axios from 'axios';
import AlertPopup from '../popups/alertPopup/alertPopup';
import { ReactComponent as PlusIcon } from '../../img/plus.svg';
import './orders.css';

export interface Order {
    id: number;
    title: string;
    date: string;
    products: Product[];
}

export interface Product {
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [listOpen, setListOpen] = useState<number| null>(null);

    const handleOpenPopup = () => {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const toggleCollapse = (order: Order) => {
        if (selectedOrder && selectedOrder.id === order.id) {
            setSelectedOrder(null);
            setListOpen(null);
            setIsCollapsed(false);
        } else {
            setSelectedOrder(order);
            setListOpen(order.id);
            setIsCollapsed(true);
        }
    };

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
    }, [orders]);

    return (
        <div className="orders-container">
            <div className="orders-title">
                <button className="orders-green-button" onClick={handleOpenPopup}>
                   <PlusIcon className="orders-plus-Icon"/>
                </button>
                <h1>Приходы / {orders.length}</h1>
            </div>
            
            {orders.map(order => (
                <OrderCard 
                key={order.id} 
                order={order} 
                onDelete={handleDeleteOrder} 
                isCollapsed={isCollapsed}
                onToggleCollapse={() => toggleCollapse(order)}
                showDeletePopup = {showDeletePopup}
                setShowDeletePopup={setShowDeletePopup}   
                listOpen={listOpen}
                />
            ))}
            {showPopup && 
            <AlertPopup 
            message="Эта функция находится в разработке" 
            delay={3000} 
            onHide={handleClosePopup}/>}
            {selectedOrder && 
            <OrderDetails 
            order={selectedOrder}
            onClose={() => toggleCollapse(selectedOrder)}/>}
        </div>
    );
};

export default Orders;
