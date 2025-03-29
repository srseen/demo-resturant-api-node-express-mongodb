// Importing required modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./config/db");
require("colors");

// Configuring dotenv
dotenv.config();
const PORT = process.env.PORT;

// Connecting to database
connectDb();

// Creating express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Express API</h1>`);
});

app.use("/auth/api/v1", require("./routes/auth.routes"));
app.use("/resturant/api/v1", require("./routes/resturant.routes"));
app.use("/category/api/v1", require("./routes/category.routes"));
app.use("/food/api/v1", require("./routes/food.routes"));

// Starting server
app.listen(PORT, () => {
  console.log(`Server Running on port http://localhost:${PORT}`.white.bgGreen);
});
