const express = require("express");
const router = express.Router();

const Validate = require("../../helper/Validate");
const UserController = require("../controller/UserController");
router.post("/user/create", Validate.registerValidate, UserController.saveUser);
router.get("/users", Validate.isAuthorize, UserController.getUsers);
router.get("/mail-verification", UserController.verifyUser);
router.post("/login", Validate.loginValidate, UserController.doLogin);
router.put("/user/update", Validate.updateValidate, UserController.updateUser);
router.get("/user", Validate.isAuthorize, UserController.getUserById);
router.delete("/user", Validate.isAuthorize, UserController.deleteUserById);

module.exports = router;
