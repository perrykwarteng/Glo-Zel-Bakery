import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import paymentRoutes from "./routes/payment.route.js";
import orderRoutes from "./routes/orders.route.js";

await connectDB();
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
});
