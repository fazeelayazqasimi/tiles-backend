import mongoose from "mongoose";

export default mongoose.model("Warehouse", new mongoose.Schema({
  name: String,
  capacity: String,
  manager: String,
  address:String,
  branchId: mongoose.Schema.Types.ObjectId
}));
