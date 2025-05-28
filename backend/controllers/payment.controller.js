import axios from "axios";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
import Transaction from "../models/transaction.model.js";
dotenv.config();

const generateOrderId = () => {
  return "ORD-" + Math.floor(10000 + Math.random() * 90000).toString();
};
const generateTransactionId = () => {
  return "TRS-" + Math.floor(10000 + Math.random() * 900).toString();
};

export const initiate = async (req, res) => {
  const { customer, items, total } = req.body;

  if (!customer || !items || !total) {
    return res.status(400).json({ message: "Missing order data." });
  }

  try {
    const payStackPayment = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        name: customer.name,
        phone: customer.phone,
        amount: total * 100,
        email: customer.email,
        items,
        callback_url: "https://glo-zel-bakery.vercel.app/verify",
        metadata: {
          custom_fields: [
            {
              display_name: "Name",
              variable_name: "name",
              value: customer.name,
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: customer.phone,
            },
            {
              display_name: "email",
              variable_name: "email",
              value: customer.email,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (payStackPayment.data.status === true) {
      const newOrder = new Order({
        orderId: generateOrderId(),
        customerName: customer.name,
        phone: customer.phone,
        email: customer.email,
        paymentRef: payStackPayment.data.data.reference,
        items: items,
        status: false,
        date: Date.now(),
      });

      await newOrder.save();

      return res.json({
        status: "success",
        message: "Payment initialized successfully",
        data: payStackPayment.data,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: payStackPayment.data.message || "An error occurred",
      });
    }
  } catch (error) {
    console.error("Error initializing payment:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Payment initialization failed",
      error: error.message,
    });
  }
};

export const verify = async (req, res) => {
  const { reference } = req.params;

  try {
    const order = await Order.findOneAndUpdate(
      { paymentRef: reference },
      { status: true },
      { new: true }
    );

    if (!order) {
      throw new Error("Order not found");
    }
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;

    if (result.status === true) {
      const existingTransaction = await Transaction.findOne({
        transactionId: result.data.id,
      });

      if (existingTransaction) {
        return res.status(200).json({
          status: "success",
          message: "Transaction already verified",
          data: existingTransaction,
        });
      }

      const newTransaction = new Transaction({
        transactionId: result.data.id,
        orderId: order.orderId,
        date: Date.now(),
        customerName: order.customerName,
        phone: order.phone,
        method: result.data.channel,
        amount: result.data.amount / 100,
        status: order.status,
      });
      await newTransaction.save();

      return res.status(200).json({
        status: "success",
        data: result.data,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: result.message || "Verification failed",
      });
    }
  } catch (error) {
    console.error("Paystack verification error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "An error occurred during verification",
      error: error.message,
    });
  }
};
