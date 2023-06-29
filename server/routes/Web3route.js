const router = require("express").Router();
const Web3Dbb = require("../models/web3db");
  ////////////////////////////////////////////////////////////////////
  ////////////////CUSTOMER SIDE LINKS////////////////////////////////
router.route("/order").post((req, res) => {
  //order making  ROUTE:/api/web3/order
  console.log(req.body);
  const CUser = req.body.CUser;
  const HUser = req.body.HUser;
  const Lat = req.body.Lat;
  const Long = req.body.Long;
  const CPhone = req.body.CPhone;
  const Message = req.body.Message;
  const UserStage = "Approved";
  const HawkerStage = "Waiting";
  const ContractStage = "Waiting";
  const Hash= req.body.Hash;

  const newNote = new Web3Dbb({
    CUser: CUser,
    HUser: HUser,
    Lat: Lat,
    Long: Long,
    CPhone: CPhone,
    Message: Message,
    UserStage: UserStage,
    HawkerStage: HawkerStage,
    ContractStage: ContractStage,
    Hash: Hash,
  });
  console.log(newNote);
  newNote.save();
});

router.route("/customer").get((req, res) => {
  // ROUTE:/api/web3/hawker

  console.log(req.query.CUser);
  const name = req.query.CUser;

  Web3Dbb.find({ CUser: name, UserStage: "Approved" }).then((foundNotes) =>
    res.json(foundNotes)
  );
});

router.route("/customerdone").get((req, res) => {
  // ROUTE:/api/web3/hawkerdone

  console.log(req.query.CUser);
  const name = req.query.CUser;
  ///IMPROVEMENT IN QUERY BELOW
  Web3Dbb.find({ CUser: name, ContractStage: "Completed" }).then((foundNotes) =>
    res.json(foundNotes)
  );
});

router.route("/customeraccept").post((req, res) => {
  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { UserStage: req.body.UserStage, HawkerStage:"Success", ContractStage: "Completed" },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
});

router.route("/customerdeny").post((req, res) => {
  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { UserStage: "Cancelled", HawkerStage:"Failed", ContractStage: "Completed" },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
});

////////////////////////////////////////////////////////////////////////////
////////////HAWKER SIDE LINKS//////////////////////////////////////////////
router.route("/hawker").get((req, res) => {
  // ROUTE:/api/web3/hawker

  console.log(req.query.HUser);
  const name = req.query.HUser;

  Web3Dbb.find({ HUser: name, ContractStage: "Waiting" }).then((foundNotes) =>
    res.json(foundNotes)
  );
});

router.route("/hawkerdone").get((req, res) => {
  // ROUTE:/api/web3/hawkerdone

  console.log(req.query.HUser);
  const name = req.query.HUser;

  Web3Dbb.find({ HUser: name, ContractStage: "Completed" }).then((foundNotes) =>
    res.json(foundNotes)
  );
});

router.route("/hawkeraccept").post((req, res) => {
  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { HawkerStage: "Accepted" },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
});

router.route("/hawkerreach").post((req, res) => {
  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { HawkerStage: "Reached" },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
});

router.route("/hawkerreceive").post((req, res) => {
  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { ContractStage: "Completed",
      HawkerStage: "Successfully completed"
    },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
});

router.route("/hawkerdeny").post((req, res) => {
  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { HawkerStage: "Cancelled", UserStage:"Hawker Cancellation", ContractStage: "Completed" },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
});
module.exports = router;
