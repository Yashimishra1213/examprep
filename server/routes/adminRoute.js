const Admin = require("../models/Admin");
const express = require("express");
const router = express.Router();

// ✅ Test route
router.get("/", async (req, res) => {
  return res.json("Admin API Working");
});

// ✅ Register Admin
router.post("/", async (req, res) => {
  try {
    const reg = new Admin(req.body);
    await reg.save();
    return res.status(201).json({ message: "Admin Registered Successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password === password) {
      return res.status(200).json({
        message: "Login Successfully",
        admin: {
          email: admin.email,
          id: admin._id,
          role: "admin",
        },
      });
    } else {
      return res.status(400).json({ message: "Password not matched" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Change Password
router.put("/change/:id", async (req, res) => {
  try {
    const { op, np, cnp } = req.body;
    const { id } = req.params;

    // check if id valid
    const user = await Admin.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // check old password
    if (user.password !== op) {
      return res.status(400).json({ message: "Old password does not match" });
    }

    // check if old == new
    if (op === np) {
      return res
        .status(400)
        .json({ message: "Old and new password cannot be same" });
    }

    // check confirm password
    if (np !== cnp) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    // update password
    await Admin.findByIdAndUpdate(id, { password: np }, { new: true });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
