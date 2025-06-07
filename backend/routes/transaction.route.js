import express from "express";
import { transaction } from "../controllers/transaction.controller.js";
const route = express.Router();

// Routes
route.get("/all-transaction", transaction);

export default route;
