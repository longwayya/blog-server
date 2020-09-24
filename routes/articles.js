var express = require('express');
var router = express.Router();

const {getArticlelist} = require('../lib/mysql');

/* GET users listing. */
router.get('/list', function (req, res, next) {
  getArticlelist().then(resource => {
    res.json(resource)
  })
});

module.exports = router;
