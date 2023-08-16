import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/Store';

import { closeAlertPopup } from '../../../features/MainSlice';
import './AlertPopup.css';

const AlertPopup: React.FC = () => {
  const dispatch = useDispatch();
  const delay: number = 3000;
  const isAlertPopup = useSelector((state: RootState) => state.datastore.isAlertPopup);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(closeAlertPopup());
    }, delay);
    return () => clearTimeout(timer);
  }, [isAlertPopup, dispatch]);

  return (
    <div className="alertPopup">
      Эта функция находится в разработке
    </div>
  );
};

export default AlertPopup;
