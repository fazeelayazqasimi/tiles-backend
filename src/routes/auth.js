import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Dummy user for testing
const dummyPasswordHash = await bcrypt.hash("123456", 10);
const user = {
  _id: "1",
  email: "admin@test.com",
  password: dummyPasswordHash,
  role: "admin",
  branchId: "000000000000000000000000"
};

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { userId: user._id, role: user.role, branchId: user.branchId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { email: user.email, role: user.role } });
});

// ✅ Proper default export
export default router;
