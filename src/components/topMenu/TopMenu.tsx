import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/Store';
import AlertPopup from '../popups/alertPopup/AlertPopup';
import DeleteConfirmationPopup from '../popups/DeleteConfirmationPopup/DeleteConfirmationPopup';
import CurrentDate from './currentDate/CurrentDate';
import SessionsCount from './sessionsCount/SessionsCount';
import './TopMenu.css';
import { ReactComponent as Logo } from '../../img/logo.svg';

function TopMenu() {
  const isPopupOpen = useSelector((state: RootState) => state.confirmPopup.isOpen);
  const isAlertPopup = useSelector((state: RootState) => state.datastore.isAlertPopup);

  return (
    <header className="topMenu">
      <Link className="siteName" to="/orders">
        <Logo className="logoStile" />
        Inventory
      </Link>
      <div className="headerInfo">
        <CurrentDate/>
        <SessionsCount/>
      </div>
      {isAlertPopup
            && <AlertPopup />}
      {isPopupOpen && <DeleteConfirmationPopup />}
    </header>
  );
}

export default TopMenu;
