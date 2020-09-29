var express = require('express');
var router = express.Router();

const { getArticlelist, getArticledetail } = require('../lib/mysql');

/* GET users listing. */
router.get('/list', function (req, res, next) {
  console.log(req.query.type)
  getArticlelist(req.query.type).then(resource => {
    res.json(resource)
  })
});

router.get('/detail', function (req, res, next) {
  console.log(req.query)
  getArticledetail(req.query.id).then(resource => {
    res.json(resource[0])
  })
});

module.exports = router;
