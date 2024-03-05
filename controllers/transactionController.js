const transactionModel = require("../models/transactionModel");
const moment = require("moment");
// Get the list of the all transactions
const getAllTransactionsController = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userId: req.body.userId,
      ...(type !== "all" && { type }),
    });

    if (transactions.length > 0) {
      res.status(200).send({
        message: "All transactions fetched successfully.",
        success: true,
        data: transactions,
      });
    } else {
      res.status(404).send({
        message: "No transaction found",
        success: false,
        data: transactions,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while fetching transactions.",
      success: false,
      error,
    });
  }
};

// Add the transactions
const addTransactionsController = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);

    // save in db
    await newTransaction.save();

    res.status(201).send({
      message: "Transaction added successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while adding transaction",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllTransactionsController,
  addTransactionsController,
};
