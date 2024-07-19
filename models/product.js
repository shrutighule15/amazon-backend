const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
