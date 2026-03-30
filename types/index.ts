export interface Shop {
  _id: string;
  name: string;
  image: string;
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
  product: string;
  quantity: number;
}

export interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  shop: string;
  items: OrderItem[];
}

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiresAt: string;
  isActive: boolean;
}
