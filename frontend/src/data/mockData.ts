import { Customer, Product, DashboardSummary, ProductSales } from "../types";

// Mock Products Data
export const products: Product[] = [
  {
    id: "p1",
    name: "Sourdough Bread",
    category: "Artisan",
    price: 6.99,
    stock: 25,
    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg",
    description: "Traditional sourdough with a crispy crust and chewy interior",
  },
  {
    id: "p2",
    name: "Baguette",
    category: "French",
    price: 3.99,
    stock: 40,
    image: "https://images.pexels.com/photos/1387075/pexels-photo-1387075.jpeg",
    description: "Classic French baguette with a crispy exterior",
  },
  {
    id: "p3",
    name: "Whole Wheat Loaf",
    category: "Healthy",
    price: 5.49,
    stock: 30,
    image: "https://images.pexels.com/photos/137103/pexels-photo-137103.jpeg",
    description: "Nutritious whole wheat bread",
  },
  {
    id: "p4",
    name: "Ciabatta",
    category: "Italian",
    price: 4.99,
    stock: 20,
    image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg",
    description: "Italian bread with a soft interior and crispy crust",
  },
  {
    id: "p5",
    name: "Croissant",
    category: "Pastry",
    price: 2.99,
    stock: 50,
    image: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg",
    description: "Buttery, flaky French pastry",
  },
  {
    id: "p6",
    name: "Rye Bread",
    category: "Artisan",
    price: 5.99,
    stock: 15,
    image: "https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg",
    description: "Dense, hearty rye bread with caraway seeds",
  },
];

// Mock Customers Data
export const customers: Customer[] = [
  {
    id: "c1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown",
    orderCount: 12,
  },
  {
    id: "c2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "555-234-5678",
    address: "456 Oak Ave, Somewhere",
    orderCount: 8,
  },
  {
    id: "c3",
    name: "Carol Williams",
    email: "carol@example.com",
    phone: "555-345-6789",
    address: "789 Pine Rd, Elsewhere",
    orderCount: 5,
  },
  {
    id: "c4",
    name: "David Brown",
    email: "david@example.com",
    phone: "555-456-7890",
    orderCount: 3,
  },
  {
    id: "c5",
    name: "Eva Davis",
    email: "eva@example.com",
    phone: "555-567-8901",
    address: "321 Elm St, Nowhere",
    orderCount: 15,
  },
];

// Mock Dashboard Summary
export const dashboardSummary: DashboardSummary = {
  totalOrders: 25,
  totalRevenue: 485.75,
  averageOrderValue: 19.43,
  pendingOrders: 4,
};

// Mock Product Sales
export const productSales: ProductSales[] = [
  {
    productId: "p1",
    productName: "Sourdough Bread",
    quantity: 12,
    revenue: 83.88,
  },
  { productId: "p5", productName: "Croissant", quantity: 32, revenue: 95.68 },
  { productId: "p2", productName: "Baguette", quantity: 18, revenue: 71.82 },
  {
    productId: "p3",
    productName: "Whole Wheat Loaf",
    quantity: 9,
    revenue: 49.41,
  },
  { productId: "p4", productName: "Ciabatta", quantity: 7, revenue: 34.93 },
  { productId: "p6", productName: "Rye Bread", quantity: 5, revenue: 29.95 },
];

// Helper function to get top customers
export const getTopCustomers = (count: number) => {
  return [...customers]
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, count);
};

// Helper function to get product inventory status
export const getInventoryStatus = () => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    stock: product.stock,
    status:
      product.stock <= 10 ? "low" : product.stock <= 20 ? "medium" : "good",
  }));
};
