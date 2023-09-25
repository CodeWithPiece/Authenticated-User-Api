const connection = require("../../db_connection/dbConnection");
const bcrypt = require("bcrypt");

var User = function (model) {
  this.userId = model.userId;
  this.userName = model.userName;
  this.userEmail = model.userEmail;
  this.userAddress = model.userAddress;
  this.userImage = model.userImage;
  this.userToken = model.userToken;
  this.iaAdmin = model.iaAdmin;
  this.isVerified = model.isVerified;
  this.createdAt = model.createdAt;
  this.updatedAt = model.updatedAt;
  this.userPassword = model.userPassword;
};

User.saveUser = (m, result) => {
  connection.query(
    `SELECT * FROM users WHERE userEmail = ${m.userEmail}`,
    (err, res) => {
      if (err) {
        bcrypt.hash(m.userPassword, 10, function (err, hash) {
          if (err) {
            result(err, null);
          } else {
            connection.query(
              "INSERT INTO users (userName, userEmail, userAddress, userPassword) values(?,?,?,?)",
              [m.userName, m.userEmail, m.userAddress, hash],
              (err, res) => {
                if (err) {
                  result(err, null);
                } else {
                  result(null, res);
                }
              }
            );
          }
        });
      } else {
        result(null, 1);
      }
    }
  );
};

User.getUsers = (result) => {
  connection.query("SELECT * FROM users ORDER BY userId DESC", (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};

module.exports = User;
