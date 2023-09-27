const userModel = require("../model/User");
const connection = require("../../db_connection/dbConnection");

exports.saveUser = (req, res) => {
  var m = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userAddress: req.body.userAddress,
    userPassword: req.body.userPassword,
  };
  userModel.saveUser(m, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "Internal server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "User added successfully...!!",
      });
    }
  });
};

exports.verifyUser = (req, res) => {
  var token = req.query.token;
  userModel.verifyUser(token, (err, user) => {
    if (err) {
      return res.status(400).send("404 not found");
    } else {
      return res.status(200).send("Verified Successfully...!!");
    }
  });
};

exports.doLogin = (req, res) => {
  var m = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };
  console.log(m);
  userModel.doLogin(m, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "Internal server error",
      });
    }
    if (!user.userToken) {
      return res.status(400).json({
        status: false,
        message: user,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Login Successfully...!!",
      login: user,
    });
  });
};

exports.getUsers = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  userModel.getUsers(authToken, (err, users) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: err,
        users: [],
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "All user list",
        users: users,
      });
    }
  });
};
