import React, { createContext, useContext, useState, useEffect } from "react";
import {
  products,
  customers,
  transactions,
  dashboardSummary,
  productSales,
} from "../data/mockData.ts";
import {
  Product,
  Customer,
  Order,
  Transaction,
  DashboardSummary,
  ProductSales,
  TimeRange,
} from "../types/index.ts";

interface AppContextType {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  transactions: Transaction[];
  dashboardSummary: DashboardSummary;
  productSales: ProductSales[];

  selectedOrder: Order | null;
  selectedCustomer: Customer | null;
  selectedProduct: Product | null;

  timeRange: TimeRange;
  orderStatusFilter: string;

  setSelectedOrder: (order: Order | null) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setTimeRange: (range: TimeRange) => void;
  setOrderStatusFilter: (status: string) => void;

  activePage: string;
  setActivePage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allProducts] = useState<Product[]>(products);
  const [allCustomers] = useState<Customer[]>(customers);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [allTransactions] = useState<Transaction[]>(transactions);
  const [summary] = useState<DashboardSummary>(dashboardSummary);
  const [sales] = useState<ProductSales[]>(productSales);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  const [activePage, setActivePage] = useState("dashboard");

  // Fetch real orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://glo-zel-bakery.onrender.com/api/orders/all-orders"
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setAllOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const value: AppContextType = {
    products: allProducts,
    customers: allCustomers,
    orders: allOrders,
    transactions: allTransactions,
    dashboardSummary: summary,
    productSales: sales,

    selectedOrder,
    selectedCustomer,
    selectedProduct,

    timeRange,
    orderStatusFilter,

    setSelectedOrder,
    setSelectedCustomer,
    setSelectedProduct,
    setTimeRange,
    setOrderStatusFilter,

    activePage,
    setActivePage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
