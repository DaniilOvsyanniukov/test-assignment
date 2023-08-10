export interface Order {
    id: number;
    title: string;
    date: string;
    products: Product[];
}

export interface Product {
    id: number;
    serialNumber: number;
    isNew: number;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: {
        start: string;
        end: string;
    };
    price: [
        { value: number, symbol: string, isDefault: number }
    ];
    order: number;
    date: string;
}

export type DataState = {
    order: Order[];
    product: Product[];
    isAlertPopup: boolean;
    isOrderDetailsToggle: boolean;
    toggleOrderId: number;
};

export interface OrderCardProps {
    orderId: number;
};

export interface ProductCardProps {
    productId: number;
  
}

export type DeletionCommand = 'order' | 'product' | 'productInOrder';

export type PopupState = {
  isOpen: boolean;
  title: string;
  orderId: number | null;
  productId: number | null;
  deletionCommand :DeletionCommand | null;
};