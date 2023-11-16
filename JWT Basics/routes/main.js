const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authMiddleware = require('../middleware/auth')

//protected/restricted route
router.route("/dashboard").get(authMiddleware,dashboard);
//public route
router.route("/login").post(login);

module.exports = router;
