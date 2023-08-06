import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavigationMenu.css';

import { ReactComponent as GearIcon } from '../../img/gear.svg';
import avatar from '../../img/avatar.jpg';
import AlertPopup from '../popups/alertPopup/alertPopup';

const NavigationMenu: React.FC = () => {
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);

    const handlePlaceholderClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setShowPopup(true);
    }

    const hidePopup = () => {
        setShowPopup(false);
    }

    return (
        <div className="navigationMenu">
            <div className="avatarContainer">
                <img src={avatar} className="avatar" alt="user avatar" />
                <button onClick={handlePlaceholderClick} className="settingsButton">
                   <GearIcon className="settingsIcon" />
                </button>
            </div>
            <ul>
                <li>
                    <NavLink to="/orders" className={location.pathname === "/orders" ? "activeLink" : ""}>
                        Приходы
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/groups" onClick={handlePlaceholderClick} className={location.pathname !== "/groups" ? "" : ""}>
                        Группы
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" onClick={handlePlaceholderClick} className={location.pathname !== "/products" ? "" : ""}>
                        Продукты
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" onClick={handlePlaceholderClick} className={location.pathname !== "/users" ? "" : ""}>
                        Пользователи
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" onClick={handlePlaceholderClick} className={location.pathname !== "/settings" ? "" : ""}>
                        Настройки
                    </NavLink>
                </li>
            </ul>
            {showPopup && <AlertPopup message="Эта функция находится в разработке" delay={3000} onHide={hidePopup}/>}
        </div>
    );
};

export default NavigationMenu;
