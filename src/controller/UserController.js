const userModel = require("../model/User");

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
