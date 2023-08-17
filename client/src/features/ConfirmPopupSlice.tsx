import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopupState } from '../types/Types';

const initialState: PopupState = {
  isOpen: false,
  title: '',
  orderId: null,
  productId: null,
  deletionCommand: null,
};

export const popupSlice = createSlice({
  name: 'confirmPopup',
  initialState,
  reducers: {
    setPopupTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setOrderIdForDeletion: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
    },
    setProductIdForDeletion: (state, action: PayloadAction<number>) => {
      state.productId = action.payload;
    },
    openConfirmPopup: (state) => {
      state.isOpen = true;
    },
    closeConfirmPopup: (state) => {
      return initialState;
    },
    setDeletionCommand: (state, action: PayloadAction<'order' | 'product' | 'productInOrder'>) => {
      state.deletionCommand = action.payload;
    },
  },
});

export const {
  setPopupTitle, setOrderIdForDeletion, setProductIdForDeletion, openConfirmPopup, closeConfirmPopup, setDeletionCommand,
} = popupSlice.actions;

export default popupSlice.reducer;
