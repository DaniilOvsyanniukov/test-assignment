import { configureStore } from '@reduxjs/toolkit';
import popupReducer from '../features/ConfirmPopupSlice';
import dataReducer from '../features/MainSlice';

const store = configureStore({
  reducer: {
    confirmPopup: popupReducer,
    datastore: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
