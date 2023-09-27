const express = require("express");
const router = express.Router();

const authValidate = require("../../helper/AuthValidate");
const UserController = require("../controller/UserController");
router.post("/user/create", UserController.saveUser);
router.get("/users", authValidate.isAuthorize, UserController.getUsers);
router.get("/mail-verification", UserController.verifyUser);
router.post("/login", UserController.doLogin);

module.exports = router;
