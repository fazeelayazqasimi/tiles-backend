import express from "express";
import Warehouse from "../models/Warehouse.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
