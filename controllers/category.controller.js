const categoryModel = require("../models/category.model");

const getCategoryAll = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    return res.status(200).send({
      success: true,
      categories,
    });
  } catch (error) {
    console.log("Error in getting all categories".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    console.log("Error in getting category by id".white.bgRed);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, menu } = req.body;
    if (!name || !description) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const newCategory = new categoryModel({
      name,
      description,
      menu,
    });
    await newCategory.save();
    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log("Error in creating category".white.bgRed);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description, menu } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        menu,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log("Error in updating category".white.bgRed);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = await categoryModel.findById(req.params.id);
    if (!categoryId) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    await categoryModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting category".white.bgRed);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getCategoryAll,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
