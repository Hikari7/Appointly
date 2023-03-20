const { signUp, login } = require("../middleware/auth.service");

exports.signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const signUpService = await signUp(username, email, password);
    signUpService.message &&
      res
        .status(signUpService.status || 400)
        .send({ errorMessage: signUpService.message });
    return res.json(signUpService);
  } catch (error) {
    return res
      .status(400)
      .send({
        errorMessage:
          error.message || "Something went wrong. Please try again.",
      });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginService = await login(email, password);
    console.log(req.body);
    loginService.errorMessage && res.status(400).send({ errorMessage });
    return res
      .cookie("token", loginService.token, { httpOnly: true })
      .json(loginService);
  } catch (error) {
    return res
      .status(400)
      .send({ errorMessage: "Something went wrong. Please try again." });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const checkToken = req.headers.cookie;
    const token = checkToken.split("=")[1];

    if (token) {
      JWT.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          return res.status(400).send({ errorMessage: "Failed to authrize" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(400).send({ errorMessage: "There is no token" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ errorMessage: "Something went wrong. Please try again." });
  }
};
