const userModel = require("../model/User");

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
      return res.status(400).send("404 Not Found");
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
        login: null,
      });
    }
    if (!user.userToken) {
      return res.status(400).json({
        status: false,
        message: user,
        login: null,
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

exports.updateUser = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  var m = {
    authToken: authToken,
    userName: req.body.userName,
    userAddress: req.body.userAddress,
  };
  userModel.updateUser(m, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "User Updated Successfully...!!",
      });
    }
  });
};

exports.getUserById = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  userModel.getUserById(authToken, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: err,
        user: null,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "User Details",
        user: user,
      });
    }
  });
};

exports.deleteUserById = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  userModel.deleteUserById(authToken, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "User Deleted Successfully...!!",
      });
    }
  });
};
