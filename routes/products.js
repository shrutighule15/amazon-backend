const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a product by ID
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// Create a product
router.post("/", async (req, res) => {
  const product = new Product({
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    price: req.body.price,
    rating: req.body.rating,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
