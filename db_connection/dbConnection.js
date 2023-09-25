const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const mysql = require("mysql");
var connection = mysql.createConnection({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
connection.connect((err) => {
  if (!err) {
    console.log(`${DB_NAME} Databse Connected Successfully`);
  } else {
    console.log(err);
  }
});

module.exports = connection;
