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
    .json({ status: true, message: "Welcome to user management app." });
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
