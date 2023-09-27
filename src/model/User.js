const { JWT_SECRET_KEY } = process.env;
const randomstring = require("randomstring");
const connection = require("../../db_connection/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      return result(err, null);
    } else {
      connection.query(
        "INSERT INTO users (userName, userEmail, userAddress, userPassword) values(?,?,?,?)",
        [m.userName, m.userEmail, m.userAddress, hash],
        (err, res) => {
          if (err) {
            return result(err, null);
          } else {
            let mailSub = "Verification Mail";
            const randomStr = randomstring.generate();
            let content =
              "<p>Hello " +
              m.userName +
              ', Please <a href="http://localhost:3000/usermanagement/api/mail-verification?token=' +
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
            return result(null, res);
          }
        }
      );
    }
  });
};

User.verifyUser = (token, result) => {
  connection.query(
    "SELECT * FROM users WHERE userToken = ?",
    [token],
    (err, res) => {
      if (err) return result(err, null);
      else return result(null, res);
    }
  );
};

User.doLogin = (m, result) => {
  connection.query(
    "SELECT * FROM users WHERE userEmail=?",
    [m.userEmail],
    (err, res) => {
      if (err) {
        return result(err, null);
      }
      if (!res.length) {
        return result(null, "Email or Password is invalid");
      } else {
        bcrypt.compare(m.userPassword, res[0].userPassword, (berr, bresult) => {
          if (berr) {
            return result(berr, null);
          }
          if (bresult) {
            const token = jwt.sign(
              { userId: res[0].userId, isAdmin: res[0].isAdmin },
              JWT_SECRET_KEY
            );
            return result(null, { userToken: token, user: res[0] });
          }
          return result(null, "Email or Password is invalid");
        });
      }
    }
  );
};

User.getUsers = (result) => {
  connection.query("SELECT * FROM users ORDER BY userId DESC", (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res && res.length) {
      return result(null, res);
    }
    return result(null, res);
  });
};

module.exports = User;
