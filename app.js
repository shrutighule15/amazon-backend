const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const purchasesRoute = require("./routes/purchases");
const indexRoute = require("./routes/index");
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const paymentsRoute = require("./routes/payments");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(
    "mongodb+srv://shrutighule555:Shruti15@cluster0.qoyxj0c.mongodb.net/amazon",
    { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Additional logging for connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB Cluster");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongoose Reconnected");
});
mongoose.connection.on("reconnectFailed", () => {
  console.log("Mongoose Reconnect Failed");
});



app.use("/", indexRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/api/payment", paymentsRoute);
app.use("/api/purchases", purchasesRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
