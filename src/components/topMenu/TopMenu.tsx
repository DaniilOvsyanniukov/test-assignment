import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import "./TopMenu.css";
import { ReactComponent as Logo } from '../../img/logo.svg';

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
            <Link className='siteName' to="/orders">
                <Logo className='logoStile'/>
                Inventory</Link>
            <div className='headerInfo'>
              <div>{currentDate.toLocaleString()}</div>
              <div>Sessions: {sessionCount}</div>
            </div>
        </header>
    );
};

export default TopMenu;