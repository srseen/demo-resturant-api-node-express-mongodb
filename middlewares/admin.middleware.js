const userModel = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Access Denied",
      });
    }
    next();
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = adminMiddleware;
