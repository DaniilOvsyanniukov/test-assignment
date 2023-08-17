import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, Product, DataState } from '../types/Types';


const initialState: DataState = {
  order: [],
  product: [],
  isAlertPopup: false,
  isOrderDetailsToggle: false,
  toggleOrderId: 0,
};

export const dataSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.order = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    deleteStoreOrder: (state, action: PayloadAction<number | null>) => {
      state.order = state.order.filter((order) => order.id !== action.payload);
    },
    deleteStoreProduct: (state, action: PayloadAction<number | null>) => {
      state.product = state.product.filter((product) => product.id !== action.payload);
    },
    deleteProductFromOrder: (state, action: PayloadAction<{ orderId: number | null; productId: number | null }>) => {
      const order = state.order.find(order => order.id === action.payload.orderId);
      if (order) {
        order.products = order.products.filter(product => product.id !== action.payload.productId);
      }
    },
    
    openAlertPopup: (state) => {
      state.isAlertPopup = true;
    },
    closeAlertPopup: (state) => {
      state.isAlertPopup = false;
    },
    toggleOrdersDetails: (state, action: PayloadAction<number | null>) => {
      if (action.payload && state.toggleOrderId !== action.payload) {
        state.isOrderDetailsToggle = true;
        state.toggleOrderId = action.payload;
      } else {
        state.isOrderDetailsToggle = false;
        state.toggleOrderId = 0;
      }
    },
  },
});

export const {
  setOrder,
  setProduct,
  deleteStoreOrder,
  deleteStoreProduct,
  deleteProductFromOrder,
  openAlertPopup,
  closeAlertPopup,
  toggleOrdersDetails,
} = dataSlice.actions;

export default dataSlice.reducer;
