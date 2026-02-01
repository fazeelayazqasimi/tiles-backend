import mongoose from "mongoose";

export default mongoose.model("InventoryTxn", new mongoose.Schema({
  branchId: mongoose.Schema.Types.ObjectId,
  warehouseId: mongoose.Schema.Types.ObjectId,
  productName: String,
  tileW: Number,
  tileH: Number,
  tilesPerBox: Number,
  boxes: Number,
  sqm: Number,
  type: String,
  offlineId: String,
  createdAt: { type: Date, default: Date.now }
}));
