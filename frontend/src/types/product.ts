export interface BreadProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  featured: boolean
}

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

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  deliveryDate?: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  method: 'cash' | 'card' | 'transfer';
  status: 'pending' | 'completed' | 'refunded';
  date: string;
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

export type TimeRange = 'today' | 'week' | 'month' | 'year';