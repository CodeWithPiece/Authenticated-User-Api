const userModel = require("../model/User");

exports.saveUser = (req, res) => {
  var m = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userAddress: req.body.userAddress,
    userPassword: req.body.userPassword,
  };
  console.log(m);
  userModel.saveUser(m, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        message: "Internal server error",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User added successfully...!!",
      });
    }
  });
};

exports.getUsers = (req, res) => {
  userModel.getUsers((err, users) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        message: "Internal server error",
        users: null,
      });
    } else {
      res.status(200).json({
        status: true,
        message: "All user list",
        users: users,
      });
    }
  });
};
