const userModel = require("../model/User");
const connection = require("../../db_connection/dbConnection");

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

exports.verifyUser = (req, res) => {
  var token = req.query.token;
  userModel.verifyUser(token, (err, user) => {
    if (err) {
      return res.send("404 not found");
    } else {
      if (user.length && user) {
        console.log(user[0].userId);
        console.log(token);
        connection.query(
          "UPDATE users SET userToken=?, isVerified=? WHERE userId=?",
          [null, 1, user[0].userId],
          (err, resp) => {
            if (err) {
              return res.send("404 not found");
            } else {
              return res.send("Verified Successfully...!!");
            }
          }
        );
      } else {
        return res.send("404 not found");
      }
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
