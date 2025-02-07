const express = require("express");
const router = express.Router();
const chatRoute = require("./chatroute.js");
const home = require("./home.js");

router.use("/", home);
router.use("/chat", chatRoute);
module.exports = router;
