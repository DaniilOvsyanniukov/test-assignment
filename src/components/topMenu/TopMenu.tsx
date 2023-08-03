import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./TopMenu.css";

const TopMenu = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const socket = io('http://localhost:3001');
        socket.on('sessionCount', (count) => {
            setSessionCount(count);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <header className="topMenu">
            <div>Inventory</div>
            <div>{currentDate.toLocaleString()} | Sessions: {sessionCount}</div>
        </header>
    );
};

export default TopMenu;