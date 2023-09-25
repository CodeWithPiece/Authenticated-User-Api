const randomstring = require("randomstring");
const connection = require("../../db_connection/dbConnection");
const bcrypt = require("bcrypt");
const sendEmail = require("../../helper/SendMail");

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
            let mailSub = "Verification Mail";
            const randomStr = randomstring.generate();
            let content =
              "<p>Hello " +
              m.userName +
              ', Please <a href="http://localhost:3000/mail-verification?token=' +
              randomStr +
              '">Verify</a> your mail.</p>';
            connection.query(
              "UPDATE users SET userToken=? WHERE userEmail=?",
              [randomStr, m.userEmail],
              (err, res) => {
                if (err) {
                  console.log("Mail Error: " + err);
                } else {
                  sendEmail(m.userEmail, mailSub, content);
                }
              }
            );
            result(null, res);
          }
        }
      );
    }
  });
};

User.getUsers = (result) => {
  connection.query("SELECT * FROM users ORDER BY userId DESC", (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};

module.exports = User;
