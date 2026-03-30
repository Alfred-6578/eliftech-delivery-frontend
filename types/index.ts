export interface Shop {
  _id: string;
  name: string;
  image: string;
  rating: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  shop: string;
}

export interface CartItem extends Product {
  quantity: number
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  name: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface OrderShop {
  shop: {
    _id: string;
    name: string;
  };
  items: OrderItem[];
  subtotal: number;
}

export interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  shops: OrderShop[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiresAt: string;
  isActive: boolean;
}
