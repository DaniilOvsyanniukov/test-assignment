import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../../app/Store';
import { openAlertPopup } from '../../features/MainSlice';
import './NavigationMenu.css';

import { ReactComponent as GearIcon } from '../../img/gear.svg';
import avatar from '../../img/avatar.jpg';
import AlertPopup from '../popups/alertPopup/AslertPopup';

const NavigationMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isAlertPopup = useSelector((state: RootState) => state.datastore.isAlertPopup);
  const location = useLocation();

  return (
    <div className="navigationMenu">
      <div className="avatarContainer">
        <img src={avatar} className="avatar" alt="user avatar" />
        <button onClick={() => dispatch(openAlertPopup())} className="settingsButton">
          <GearIcon className="settingsIcon" />
        </button>
      </div>
      <ul>
        <li>
          <NavLink to="/orders" className={location.pathname === '/orders' ? 'activeLink' : ''}>
            Приходы
          </NavLink>
        </li>
        <li>
          <NavLink to="/groups" onClick={() => dispatch(openAlertPopup())} className={location.pathname !== '/groups' ? '' : ''}>
            Группы
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={location.pathname === '/products' ? 'activeLink' : ''}>
            Продукты
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" onClick={() => dispatch(openAlertPopup())} className={location.pathname !== '/users' ? '' : ''}>
            Пользователи
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" onClick={() => dispatch(openAlertPopup())} className={location.pathname !== '/settings' ? '' : ''}>
            Настройки
          </NavLink>
        </li>
      </ul>
      {isAlertPopup && <AlertPopup />}
    </div>
  );
};

export default NavigationMenu;
