// Common types used throughout the application

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  orderCount: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerId: string;
  createdAt: string;
  deliveryDate?: string;
  status: boolean;
  total: number;
  items: OrderItem[];
}

export interface Transaction {
  transactionId: string;
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  method: "cash" | "card" | "transfer" | "mobile_money";
  amount: string; 
  status: boolean;
}

export interface DashboardSummary {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
}

export interface ProductSales {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
}

export type TimeRange = "today" | "week" | "month" | "year";
