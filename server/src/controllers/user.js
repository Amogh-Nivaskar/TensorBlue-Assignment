const UserModel = require("../models/user");

async function login(req, res) {
  try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({ name: email, email });
      await user.save();
    }
    return res
      .status(200)
      .json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function checkAuth(req, res) {
  try {
    const user = req.user;
    const { email } = req.body;

    return res.status(200).json({ message: "User is logged in ", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { login, checkAuth };
