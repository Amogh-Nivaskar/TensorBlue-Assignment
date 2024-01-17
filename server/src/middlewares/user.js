const UserModel = require("../models/user");

async function verifyUser(req, res, next) {
  try {
    const userId = req.header("Authorization");
    if (!userId) throw new Error("UserId not found");

    const user = await UserModel.findById(userId);
    if (!user) throw new Error("UserId is faulty");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { verifyUser };
