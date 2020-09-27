var express = require('express');
var router = express.Router();

const user = require('../config/user')

const jwt = require("jsonwebtoken")
/* GET login page. */
router.post('/', function (req, res, next) {
  let { username, password } = req.body
  if (username === user.name && password === user.password) {
    // HS256签名
    const token = jwt.sign({ user: "longway", exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, "longway")
    res.json({ token })
  } else {
    res.json({ err: "密码错误" })
  }
});
module.exports = router;
