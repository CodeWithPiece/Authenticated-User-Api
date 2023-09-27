const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");
router.post("/user/create", UserController.saveUser);
router.get("/users", UserController.getUsers);
router.get("/mail-verification", UserController.verifyUser);
router.post("/login", UserController.doLogin);

module.exports = router;
