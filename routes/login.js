var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken")
/* GET login page. */
router.post('/', function (req, res, next) {
  let { username, password } = req.body
  console.log(username, password)
  if (username === "longway" && password === "longway") {
    // HS256签名
    const token = jwt.sign({ user: "longway", exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, "longway")
    console.log(token)
    res.json({ token })
  } else {
    res.json({ err: "出错" })
  }
});

module.exports = router;