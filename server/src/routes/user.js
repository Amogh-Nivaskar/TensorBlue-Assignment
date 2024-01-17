const express = require("express");
const { login, checkAuth } = require("../controllers/user");
const { verifyUser } = require("../middlewares/user");

const router = express.Router();

router.post("/login", login);

router.post("/checkAuth", verifyUser, checkAuth);

module.exports = router;
