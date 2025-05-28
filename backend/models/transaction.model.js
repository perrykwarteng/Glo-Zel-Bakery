import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema(
  {
    transactionId: { type: String, unique: true, required: true },
    orderId: String,
    date: Date,
    customerName: String,
    phone: String,
    method: String,
    amount: String,
    status: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
