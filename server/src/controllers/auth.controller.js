const { signUp, login, userCheck } = require("../middleware/auth.service");

exports.signUpController = async (req, res) => {
  const { username, email, password } = req.body;
  const signUpService = await signUp(username, email, password);
  return res.json(signUpService);
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginService = await login(email, password);
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

exports.resetPassword = async () => {};

exports.passwordResetController = async () => {};
