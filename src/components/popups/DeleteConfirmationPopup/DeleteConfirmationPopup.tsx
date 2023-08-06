import React from 'react';
import './DeleteConfirmationPopup.css';
import { ReactComponent as CloseIcon } from '../../../img/cross.svg'; 
import { ReactComponent as BinIcon } from '../../../img/bin.svg';


interface DeleteConfirmationPopupProps {
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({ title, onCancel, onConfirm }) => {
    return (
        <div className="popup-overlay" onClick={onCancel}>
            <div className="delete-confirmation-popup" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-button" onClick={onCancel}>
                   <CloseIcon className="popup-close-button-icon" />
                </button>
                <div className="delete-confirmation-content">
                   <h2 className="delete-confirmation-message">Вы действительно хотите удалить этот приход?</h2>
                   <h3 className="delete-confirmation-title">{title}</h3>
                </div>
                <div className="popup-buttons">
                    <button className="cancel-button" onClick={onCancel}>Отменить</button>
                    <button className="delete-button" onClick={onConfirm}>
                        <BinIcon className="delete-button-icon" />
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationPopup;

