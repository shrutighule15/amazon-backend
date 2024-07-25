const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchase");

// Save purchase details
router.post("/save", async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  console.log("Received purchase data:", req.body); // Log the received data

  try {
    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate item structure
    items.forEach((item) => {
      if (!item.productId || !item.quantity || !item.price) {
        console.log("Validation error: Invalid item data", item);
        throw new Error("Invalid item data");
      }
    });

    const purchase = new Purchase({
      userId,
      items,
      totalAmount,
      purchaseDate: new Date(),
    });

    const savedPurchase = await purchase.save();
    console.log("Saved purchase:", savedPurchase); // Log saved data
    res.status(201).json(savedPurchase);
  } catch (err) {
    console.error("Error saving purchase:", err); // Log errors
    res.status(400).json({ message: err.message });
  }
});
// Get purchases by user ID
router.get("/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User is not logged in" });
    }

    const purchases = await Purchase.find({ userId });
    res.json(purchases);
  } catch (err) {
    console.error("Error fetching purchases:", err); // Log errors
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
