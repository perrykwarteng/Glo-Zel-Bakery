import React, { useState } from "react";
import { Card, CardContent } from "../../src/components/ui/card";

import wheatBread from "../../asset/WheatBread.jpg";
import sugarBread from "../../asset/SugarBread.jpg";
import brownBread from "../../asset/brownbread.jpg";
import teaBread from "../../asset/teaBread.jpg";
import butterBread from "../../asset/butterbread.jpg";
import cakeBread from "../../asset/cakebread.jpg";

interface BreadItem {
  id: number;
  name: string;
  prices: number[];
  image: string;
}

interface CartItem extends BreadItem {
  qty: number;
  price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface PaystackPaymentResponse {
  status: string;
  message: string;
  data: {
    data?: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
}

type BulkQuantities = { [id: number]: number };

const breadMenu: BreadItem[] = [
  { id: 1, name: "Wheat Bread", prices: [20, 30], image: wheatBread },
  { id: 2, name: "Sugar Bread", prices: [20, 30], image: sugarBread },
  { id: 3, name: "Brown Bread", prices: [20, 30], image: brownBread },
  { id: 4, name: "Tea Bread", prices: [20, 30], image: teaBread },
  { id: 5, name: "Butter Bread", prices: [20, 30], image: butterBread },
  { id: 6, name: "Cake Bread", prices: [20, 30], image: cakeBread },
];

export default function Order() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [bulkQuantities, setBulkQuantities] = useState<BulkQuantities>({});
  const [selectedPrices, setSelectedPrices] = useState<{
    [id: number]: number;
  }>({});

  const updateQuantity = (id: number, value: string): void => {
    setBulkQuantities({ ...bulkQuantities, [id]: parseInt(value) || 0 });
  };

  const handlePriceChange = (id: number, price: number): void => {
    setSelectedPrices({ ...selectedPrices, [id]: price });
  };

  const addBulkToCart = (): void => {
    const updatedCart = [...cart];

    breadMenu.forEach((bread) => {
      const qty = bulkQuantities[bread.id];
      const selectedPrice = selectedPrices[bread.id] ?? bread.prices[0];

      if (qty > 0) {
        const existing = updatedCart.find(
          (item) => item.id === bread.id && item.price === selectedPrice
        );

        if (existing) {
          existing.qty += qty;
        } else {
          updatedCart.push({ ...bread, qty, price: selectedPrice });
        }
      }
    });

    setCart(updatedCart);
    setBulkQuantities({});
  };

  const total: number = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = (): void => {
    setShowCheckout(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!customer.name || !customer.phone || !customer.location) {
      alert("Please fill in all customer details.");
      return;
    }

    const orderDetails = {
      customer,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.qty,
        unitPrice: selectedPrices[item.id] || item.prices[0],
        totalPrice: (selectedPrices[item.id] || item.prices[0]) * item.qty,
      })),
      total,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/payments/initiate-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const result: PaystackPaymentResponse = await response.json();

      if (result.status === "success" && result.data.data?.authorization_url) {
        window.location.assign(result.data.data?.authorization_url);
      }

      console.log(result?.data?.data?.authorization_url);
    } catch (error: any) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#b71c1c] text-center">
        BreadBasket
      </h1>

      {!showCheckout ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {breadMenu.map((bread) => (
              <Card key={bread.id} className="rounded-2xl shadow-md">
                <CardContent className="p-4">
                  <img
                    src={bread.image}
                    alt={bread.name}
                    className="rounded-xl mb-4 w-full h-40 object-cover"
                  />
                  <h2 className="text-xl text-[#f59e0b] font-semibold mb-2">
                    {bread.name}
                  </h2>
                  <select
                    value={selectedPrices[bread.id] ?? bread.prices[0]}
                    onChange={(e) =>
                      handlePriceChange(bread.id, parseInt(e.target.value))
                    }
                    className="w-full p-2 mb-2 border rounded-md"
                  >
                    {bread.prices.map((price) => (
                      <option key={price} value={price}>
                        GHS {price}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={bulkQuantities[bread.id] || ""}
                    onChange={(e) => updateQuantity(bread.id, e.target.value)}
                    placeholder="Qty"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-right mb-8">
            <button className="btn-primary" onClick={addBulkToCart}>
              Add Bulk to Cart
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${item.price}-${index}`}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm"
                >
                  <span>
                    {item.name} ({item.price}) x {item.qty}
                  </span>
                  <span>GHS {item.price * item.qty}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 text-right">
            <span className="text-lg font-bold">Total: GHS {total}</span>
            <button onClick={handleCheckout} className="btn-primary ml-4">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">🧾 Order Summary</h2>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li
                key={`${item.id}-${item.price}-${index}`}
                className="flex justify-between"
              >
                <span>
                  {item.name} ({item.price}) x {item.qty}
                </span>
                <span>GHS {item.price * item.qty}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold mb-6">Total: GHS {total}</p>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={customer.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={customer.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="text"
              name="location"
              placeholder="Delivery Location"
              value={customer.location}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <button onClick={placeOrder} className="btn-primary mt-6 w-full">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
