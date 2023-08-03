import React from 'react';

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
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const total = order.products.reduce((prev, product) => {
        product.price.forEach(price => {
            prev[price.symbol] = (prev[price.symbol] || 0) + price.value;
        });
        return prev;
    }, {} as Record<string, number>);

    const handleDelete = () => {
    };

    return (
        <div className="order-card">
            <h2>{order.title}</h2>
            <p>Кол-во продуктов: {order.products.length}</p>
            <p>Дата создания: {new Date(order.date).toLocaleString()}</p>
            <p>Дата создания (ISO): {new Date(order.date).toISOString()}</p>
            {Object.entries(total).map(([symbol, value]) => (
                <p key={symbol}>Сумма прихода ({symbol}): {value}</p>
            ))}
            <button onClick={handleDelete}>Удалить приход</button>
        </div>
    );
};

export default OrderCard;