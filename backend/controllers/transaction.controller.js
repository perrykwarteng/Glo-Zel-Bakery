import dotenv from "dotenv";
import Transaction from "../models/transaction.model.js";

dotenv.config();

export const transaction = async (req, res) => {
  try {
    const allTransactions = await Transaction.find();
    res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};
