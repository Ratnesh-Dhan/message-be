const express = require("express");
const router = express.Router();
const chatRoute = require("./chatroute.js");
const home = require("./home.js");
const funny = require("./funny.js");

router.use("/", home);
router.use("/chat", chatRoute);
router.use("/funny", funny);
module.exports = router;
