var express = require('express');
const { isAdmin, token } = require('../config/isAuth');
var router = express.Router();

const user = require('../config/isAuth')


/* GET login page. */
router.post('/', function (req, res, next) {
  let { username, password } = req.body
  if (isAdmin(username, password)) {
    // HS256签名
    res.json({ token })
  } else {
    res.json({ err: "密码错误" })
  }
});
module.exports = router;
