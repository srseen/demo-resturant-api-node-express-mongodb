# **การใช้งาน**

```jsx
npm install
```

- เปลี่ยน env.example เป็น .env

```
PORT=
MONGODB_URI=
```

---

# ขั้นตอนการเขียน backend ด้วย Node.js

# step 1 :

- สร้าง server(file server.js)

```
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
```

- ติดตั้ง library พื้นฐานที่ต้องใช้

```jsx
npm install express dotenv cors morgan mongoose nodemon bcrypt jsonwebtoken colors
```

# step 2 :

- สร้าง folder สำหรับวางโครงสร้าง project
  - config (เช่น database config)
  - models (สร้าง model ในการ create โครงสร้างใน database)
  - routes (สร้างเส้นทาง route)
  - controllers (สร้าง logic สำหรับให้ route เรียกใช้งาน)
  - middleware (สำหรับสร้าง logic สำหรับ permission ต่าง ๆ ก่อนไปทำงานต่อในส่วน logic ใน controller)

# step 3 :

- สร้าง models สำหรับ วางโครงสร้าง database
  - สร้างอันที่ง่ายก่อน ⇒ ความสัมพันธ์กับ schema อื่นน้อยที่สุดก่อน

```jsx
// Initialize mongoose
const mongoose = require("mongoose");

// Define the category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: [true, "Category menu is required"],
    },
  },
  { timestamps: true }
);

// Create the category model
const Category = mongoose.model("Category", categorySchema);

// Export the category model
module.exports = Category;
```

# step 4 :

- สร้าง route เพื่อกำหนดเส้นทางของ API (กำหนดว่า app เราสามารถทำอะไรบ้าง เพื่อนำไปทำ logic ของ app )

```
// Init router
const express = require("express");
const router = express.Router();

// Import auth controller
const { register, login, logout } = require("../controllers/auth.controller");

// Define routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// Export router
module.exports = router;
```

# step 5 :

- สร้าง interface ใน controller เพื่อที่จำกำหนดโครงสร้างในการสร้าง logic

```jsx
const resturantModel = require("../models/resturant.model");

const getResturantAll = async (req, res) => {};

const getResturantById = async (req, res) => {};

const createResturant = async (req, res) => {};

const updateResturant = async (req, res) => {};

const deleteResturant = async (req, res) => {};

module.exports = {
  getResturantAll,
  getResturantById,
  createResturant,
  updateResturant,
  deleteResturant,
};
```

# step 6 :

- สร้าง logic ในการทำงานของ route ต่างๆ

```jsx
const resturantModel = require("../models/resturant.model");

const getResturantAll = async (req, res) => {
  try {
    const resturants = await resturantModel.find();
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No resturants found",
      });
    }
    return res.status(200).send({
      success: true,
      resturants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getResturantById = async (req, res) => {
  try {
    const resturantId = await resturantModel.findById(req.params.id);
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    return res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const createResturant = async (req, res) => {
  try {
    const { name, description, location, rating, menu, image } = req.body;
    if (!name || !description || !location || !rating || !menu) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const newResturant = new resturantModel({
      name,
      description,
      location,
      rating,
      menu,
      image,
    });
    await newResturant.save();
    return res.status(201).send({
      success: true,
      message: "Resturant created successfully",
      resturant: newResturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateResturant = async (req, res) => {
  try {
    const resturantId = await resturantModel.findById(req.params.id);
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    const updatedResturant = await resturantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Resturant updated successfully",
      resturant: updatedResturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteResturant = async (req, res) => {
  try {
    const resturantId = await resturantModel.findById(req.params.id);
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    await resturantModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Resturant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getResturantAll,
  getResturantById,
  createResturant,
  updateResturant,
  deleteResturant,
};
```
