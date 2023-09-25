const connection = require("../../db_connection/dbConnection");
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
};

User.getUsers = (result) => {
    connection.query('SELECT * FROM users ORDER BY userId DESC', (err, res) => {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
}

module.exports = User;