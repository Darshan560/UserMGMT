import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import "./db/db.js";          // ✅ FIXED
import User from "./model/user.js";

const app = express();
const PORT = 3000;

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.html"));
});
app.get("/all-users", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "users.html"));
});

app.get("/info", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit-info", async (req, res) => {
  try {
    const { name, age, email, gender } = req.body;

    const user = new User({ name, age, email, gender });
    await user.save();

    console.log("✅ User added successfully");

    // 🔥 Redirect to home with success flag
    res.redirect("/?success=1");

  } catch (err) {
    console.error(err);
    res.redirect("/?success=0");
  }
});


// 🔹 Get all users (API)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🔹 Delete user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`);
});
