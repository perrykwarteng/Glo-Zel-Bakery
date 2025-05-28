import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    customerName: String,
    email: String,
    phone: String,
    paymentRef: String,
    items: [],
    date: Date,
    status: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
