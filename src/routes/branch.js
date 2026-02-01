import express from "express";
import Branch from "../models/Branch.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Branch
router.post("/", protect, async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Branches
router.get("/", protect, async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Proper default export
export default router;
