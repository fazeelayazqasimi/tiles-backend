import express from "express";
import InventoryTxn from "../models/InventoryTxn.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

const calcSqm = (w, h, perBox, boxes) =>
  (w / 1000) * (h / 1000) * perBox * boxes;

router.post("/", protect, async (req, res) => {
  const { tileW, tileH, tilesPerBox, boxes } = req.body;
  const sqm = calcSqm(tileW, tileH, tilesPerBox, boxes);

  const txn = await InventoryTxn.create({
    ...req.body,
    sqm,
    branchId: req.user.branchId
  });

  res.json(txn);
});

export default router;
