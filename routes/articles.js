var express = require('express');
var router = express.Router();

const { getArticlelist, getArticledetail, addArticle, deleteArticle, updateArticle } = require('../lib/mysql');

/* GET users listing. */
router.get('/list', function (req, res, next) {

  getArticlelist(req.query).then(resource => {
    res.json(resource)
  })
});

router.get('/detail', function (req, res, next) {
  console.log(req.query)
  getArticledetail(req.query.id).then(resource => {
    res.json(resource[0])
  })
});

router.post('/post', function (req, res, next) {
  if (req.body.id) {
    updateArticle(req.body).then(resource => {
      res.json({ type: "success" })
    })
  } else {
    addArticle(req.body).then(resource => {
      res.json({ type: "success" })
    })
  }
});


router.delete('/delete', function (req, res, next) {
  deleteArticle(req.query.id).then(resource => {
    res.json({ type: "success" })
  })
});


module.exports = router;
