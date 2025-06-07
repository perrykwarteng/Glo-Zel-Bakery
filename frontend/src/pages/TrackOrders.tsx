import { useEffect, useState } from "react";
import { Card, CardContent } from "../../src/components/ui/card";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice?: number;
}

interface Order {
  date: string; // ISO string
  items: OrderItem[];
  orderId: string;
  paymentRef: string;
  phone: string;
}

export default function TrackOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedRefs = JSON.parse(
        localStorage.getItem("paymentRefs") || "[]"
      );

      if (storedRefs.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://glo-zel-bakery.onrender.com/api/orders/all-orders"
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          const myOrders = data.filter((order: Order) =>
            storedRefs.includes(order.paymentRef)
          );
          setOrders(myOrders);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (acc, item) => acc + (item.quantity ?? 0) * (item.unitPrice ?? 0),
              0
            );

            return (
              <Card key={order.orderId} className="shadow-md rounded-xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">
                      Order #{order.orderId}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <ul className="mb-4">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold">Total: GHS {total.toFixed(2)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
