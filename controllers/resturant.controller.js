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
    console.log("Error in getting all resturants".white.bgRed);
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
    console.log("Error in getting resturant by id".white.bgRed);
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
    console.log("Error in creating resturant".white.bgRed);
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
    console.log("Error in updating resturant".white.bgRed);
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
    console.log("Error in deleting resturant".white.bgRed);
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
