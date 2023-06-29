const mongoose = require("mongoose");

const Web3Db = new mongoose.Schema(
  {
    CUser: {
      type: String,
    },
    HUser: {
      type: String,
    },
    Lat: {
      type: Number,
    },
    Long: {
      type: Number,
    },
    CPhone: {
      type: Number,
    },
    Message: {
      type: String,
    },
    CAddress: {
      type: String, //customer metamask address
    },
    HAddress: {
      type: String, //hawker metamask address
    },
    WAddress: {
      type: String, //withdraw solidity address
    },
    PAddress: {
      type: String, //payment solidity address
    },
    UserStage: {
      type: String, //Approved, PCompleted, Completed, Cancelled
    },
    HawkerStage: {
      type: String, //Waiting, Accepted, Reached, Success, Failed, Cancelled
    },
    ContractStage: {
      type: String, //Completed, Waiting
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Web3Db", Web3Db);
