const env = require("dotenv");
env.config();
const connection = require("./db_connection/dbConnection");
const express = require("express");
const upload = require("express-fileupload");
const bodyparse = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(upload()); // used for accepting multipart-form-data.
app.use("/image", express.static("public")); // used to serve static content from the server.
app.use(bodyparse.json()); // used for accepting raw(json) data.
app.use(bodyparse.urlencoded({ extended: true })); // used for accepting x-www-form-urlencoded.

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
