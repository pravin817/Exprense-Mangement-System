// Import the userModel

const userModel = require("../models/userModel");

// The login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// The register controller
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ succes: false, error });
  }
};

module.exports = {
  loginController,
  registerController,
};
