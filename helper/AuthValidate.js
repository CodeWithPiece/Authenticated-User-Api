exports.isAuthorize = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        status: false,
        message: "Please provide token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
