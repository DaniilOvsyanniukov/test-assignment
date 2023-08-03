import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

const NavigationMenu: React.FC = () => {
    return (
        <div className="navigationMenu">
            <ul>
                <li>
                    <Link to="/orders">Приходи</Link>
                </li>
                <li>
                    <Link to="/#">Группы</Link>
                </li>
                <li>
                    <Link to="/#">Продукты</Link>
                </li>
                <li>
                    <Link to="/#">Пользователи</Link>
                </li>
                <li>
                    <Link to="/#">Настройки</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavigationMenu;