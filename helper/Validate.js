exports.isAuthorize = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(400).json({
        status: false,
        message: "Please provide token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.loginValidate = (req, res, next) => {
  try {
    if (!req.body.userEmail) {
      return res.status(400).json({
        status: false,
        message: "Please provide email",
        login: null,
      });
    }
    if (!req.body.userPassword) {
      return res.status(400).json({
        status: false,
        message: "Please provide password",
        login: null,
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.registerValidate = (req, res, next) => {
  try {
    if (!req.body.userName) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Name",
      });
    }
    if (!req.body.userEmail) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Email",
      });
    }
    if (!req.body.userAddress) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Address",
      });
    }
    if (!req.body.userPassword) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Password",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.updateValidate = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(400).json({
        status: false,
        message: "Please provide token",
      });
    }
    if (!req.body.userName) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Name",
      });
    }
    if (!req.body.userAddress) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Address",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
