import express from "express";
import { orders } from "../controllers/order.controller.js";
const route = express.Router();

// Routes
route.get("/all-orders", orders);

export default route;
