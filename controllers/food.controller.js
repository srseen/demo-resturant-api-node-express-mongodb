const foodModel = require("../models/food.model");

const getFoodAll = async (req, res) => {
  try {
    const foods = await foodModel.find();
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No foods found",
      });
    }
    return res.status(200).send({
      success: true,
      foods,
    });
  } catch (error) {
    console.log("Error in getting all foods".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFoodById = async (req, res) => {
  try {
    const foodId = await foodModel.findById(req.params.id);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    return res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log("Error in getting food by id".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      image,
    });
    await newFood.save();
    return res.status(201).send({
      success: true,
      message: "Food created successfully",
      food: newFood,
    });
  } catch (error) {
    console.log("Error in creating food".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const foodId = await foodModel.findById(req.params.id);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const updatedFood = await foodModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    console.log("Error in updating food".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const foodId = await foodModel.findById(req.params.id);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    await foodModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting food".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getFoodAll,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
