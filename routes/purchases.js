const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchase");

// Save purchase details
router.post("/save", async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const purchase = new Purchase({
      userId,
      items,
      totalAmount,
    });

    const savedPurchase = await purchase.save();
    res.status(201).json(savedPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
