import mongoose from "mongoose";

export default mongoose.model("Branch", new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  manager: String,
  isActive: { type: Boolean, default: true }
}));
