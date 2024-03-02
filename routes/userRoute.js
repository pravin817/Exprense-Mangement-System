const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

// Create the router object
const router = express.Router();

// create the route

// LOGIN user || POST
router.post("/login", loginController);

// REGISTER user || POST
router.post("/register", registerController);

module.exports = router;
