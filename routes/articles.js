var express = require('express');
var router = express.Router();

const { getArticlelist, getArticledetail, addArticle, deleteArticle, updateArticle, getHotArticlelist, increaseLooktimes } = require('../lib/mysql');

const { isAuth } = require("../config/isAuth")
/* GET users listing. */
router.get('/list', function (req, res, next) {
  getArticlelist(req.query).then(resource => {
    res.json(resource)
  })
});

router.get('/hot', function (req, res, next) {
  getHotArticlelist(req.query).then(resource => {
    res.json(resource)
  })
});

router.get('/detail', function (req, res, next) {
  getArticledetail(req.query.id).then(resource => {
    res.json(resource[0])
  })
});

router.post('/post', function (req, res, next) {
  if (isAuth(req.headers.accesstoken)) {
    console.log(isAuth(req.headers.accesstoken))
    if (req.body.id) {
      updateArticle(req.body).then(resource => {
        res.json({ type: "success" })
      })
    } else {
      addArticle(req.body).then(resource => {
        res.json({ type: "success" })
      })
    }
  }else{
    res.json({err:"登录异常"})
  }

});


router.delete('/delete', function (req, res, next) {

  if (isAuth(req.headers.accesstoken)) {
  deleteArticle(req.query.id).then(resource => {
    res.json({ type: "success" })
  })
  }else{
    res.json({err:"登录异常"})
  }
});


router.post('/looktimes', function (req, res, next) {
  if (req.body.id) {
    increaseLooktimes(req.body.id).then(resource => {
      res.json({ type: "success" })
    })
  }
})

module.exports = router;
