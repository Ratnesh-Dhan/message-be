const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is a test message sent from the server to the client.");
});
module.exports = router;
