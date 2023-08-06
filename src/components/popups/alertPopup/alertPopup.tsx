import React, { useEffect } from 'react';
import './alertPopup.css';

interface AlertPopupProps {
    message: string;
    delay: number;
    onHide: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ message, delay, onHide }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onHide();
        }, delay);
        return () => clearTimeout(timer);
    }, [delay, onHide]);

    return (
        <div className="alertPopup">
            {message}
        </div>
    );
};

export default AlertPopup;