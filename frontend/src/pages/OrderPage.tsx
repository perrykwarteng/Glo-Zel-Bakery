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

const BREAD_PRICE = 25;

const breadMenu: BreadItem[] = [
  { id: 1, name: "Wheat Bread", image: wheatBread },
  { id: 2, name: "Sugar Bread", image: sugarBread },
  { id: 3, name: "Brown Bread", image: brownBread },
  { id: 4, name: "Tea Bread", image: teaBread },
  { id: 5, name: "Butter Bread", image: butterBread },
  { id: 6, name: "Cake Bread", image: cakeBread },
];

export default function Order() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateQuantity = (id: number, value: string) => {
    const qty = parseInt(value);
    setQuantities((prev) => ({
      ...prev,
      [id]: isNaN(qty) || qty < 0 ? 0 : qty,
    }));
  };

  const addToCart = (bread: BreadItem) => {
    const qty = quantities[bread.id] || 0;
    if (qty <= 0) {
      alert("Please enter a quantity greater than zero.");
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === bread.id && item.price === BREAD_PRICE
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].qty += qty;
        return updatedCart;
      } else {
        return [...prevCart, { ...bread, qty, price: BREAD_PRICE }];
      }
    });

    setQuantities((prev) => ({ ...prev, [bread.id]: 0 }));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setShowCheckout(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        unitPrice: item.price,
        totalPrice: item.price * item.qty,
      })),
      total,
    };

    setLoading(true);
    try {
      const response = await fetch(
        `https://glo-zel-bakery.onrender.com/api/payments/initiate-payment`,
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
      const ref = result.data.data?.reference;

      if (ref) {
        // Get current refs from localStorage
        const existingRefs = JSON.parse(
          localStorage.getItem("paymentRefs") || "[]"
        );

        // Avoid duplicates
        if (!existingRefs.includes(ref)) {
          existingRefs.push(ref);
          localStorage.setItem("paymentRefs", JSON.stringify(existingRefs));
        }
      }

      if (result.status === "success" && result.data.data?.authorization_url) {
        window.location.assign(result.data.data.authorization_url);
      } else {
        alert("Payment initialization failed.");
      }
    } catch (error: any) {
      alert(`Failed to place order: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
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
                  <p className="mb-2 font-bold">GHS {BREAD_PRICE}</p>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={quantities[bread.id] ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        updateQuantity(bread.id, val);
                      }
                    }}
                    placeholder="Qty"
                    className="w-full p-2 mb-4 border rounded-md"
                  />

                  <button
                    onClick={() => addToCart(bread)}
                    className="w-full bg-[#f59e0b] text-white font-semibold py-2 rounded-md hover:bg-[#d97706] transition"
                  >
                    Add to Cart
                  </button>
                </CardContent>
              </Card>
            ))}
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
                    {item.name} (GHS {item.price}) x {item.qty}
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
                  {item.name} (GHS {item.price}) x {item.qty}
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

          <button
            onClick={placeOrder}
            className="btn-primary mt-6 w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}
