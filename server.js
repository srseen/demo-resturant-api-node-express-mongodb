// Importing required modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
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

// Importing all routes from the Routes folder
readdirSync("./routes").map((r) =>
  app.use("/api/v1", require(`./Routes/${r}`))
);

// Starting server
app.listen(PORT, () => {
  console.log(`Server Running on port http://localhost:${PORT}`.white.bgGreen);
});
