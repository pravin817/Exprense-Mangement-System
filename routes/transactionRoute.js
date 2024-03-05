const express = require("express");
const {
  addTransactionsController,
  getAllTransactionsController,
} = require("../controllers/transactionController");

// router object
const router = express.Router();

// Routes
// add Transaction || POST

router.post("/add-transaction", addTransactionsController);

//get Transactions || GET
router.get("/get-transaction", getAllTransactionsController);
module.exports = router;
