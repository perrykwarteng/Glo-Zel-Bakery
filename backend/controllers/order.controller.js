import dotenv from "dotenv";
import Order from "../models/order.model.js";

dotenv.config();

export const orders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};
