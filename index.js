const env = require("dotenv");
env.config();
const bcrypt = require("bcrypt");
const connection = require("./db_connection/dbConnection");
const jwt = require("jsonwebtoken");
const express = require("express");
const upload = require("express-fileupload");
const bodyparse = require("body-parser");
const apiRoutes = require("./src/router/ApiRouter");
const cors = require("cors");
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(upload()); // used for accepting multipart-form-data.
app.use("/image", express.static("public")); // used to serve static content from the server.
app.use(bodyparse.json()); // used for accepting raw(json) data.
app.use(bodyparse.urlencoded({ extended: true })); // used for accepting x-www-form-urlencoded.
app.use("/usermanagement/api", apiRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ status: true, message: "Welcome to user management app" });
});

// let jwtSecretKey = process.env.JWT_SECRET_KEY;
// console.log(jwtSecretKey);
// let data = {
//   userId: 12,
// };
// const token = jwt.sign(data, jwtSecretKey);
// console.log("JWT TOKEN: " + token);
// try {
//   const verified = jwt.verify(token + "12", jwtSecretKey);
//   if (verified) {
//     console.log("Authorised User: " + verified.userId);
//   } else {
//     console.log("Unauthorised User");
//   }
// } catch (error) {
//   console.log("Unauthorised User " + error);
// }

// const saltRounds = 10;
// const myPlaintextPassword = "123456";
// const someOtherPlaintextPassword = "Rajesh Kumar";
// var newPassword = "";
// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   newPassword = hash;
//   console.log(newPassword);
// });
// bcrypt.compare("nirmal@12", "$2b$10$lWJJog2q4ujZziUXkm84dexukyojidaLHuE2o/R4hsIFMwLwKWbCG", function(err, result) {
//   if(result){
//     console.log("Same Password");
//   }else{
//     console.log("Wrong Password");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
