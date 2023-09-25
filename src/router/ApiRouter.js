const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");
router.post("/user/create", UserController.saveUser);
router.get("/users", UserController.getUsers);

module.exports = router;
