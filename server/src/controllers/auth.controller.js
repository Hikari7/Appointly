const { signUp, login } = require("../middleware/auth.service");

exports.signUpController = async (req, res) => {
  const { username, email, password } = req.body;
  const signUpService = await signUp(username, email, password);
  return res.json(signUpService);
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({body: req.body});
    const loginService = await login(email, password);
    console.log({loginService});
    loginService.errorMessage && res.status(400).send({ errorMessage });
    return res      .json(loginService);
  } catch (error) {
    return res
      .status(400)
      .send({ errorMessage: "Something went wrong. Please try again." });
  }
};