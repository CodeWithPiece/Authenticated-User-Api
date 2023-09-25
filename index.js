const express = require("express");
const cors = require("cors");
const app = express();
const env = require("dotenv");
env.config();
const connection = require("./db_connection/dbConnection");
app.use(cors());
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
