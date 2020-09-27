var express = require('express');
var router = express.Router();

var multiparty = require("multiparty");

router.post('/uploadimg', function (req, res, next) {
  var form = new multiparty.Form({
    uploadDir: './public/images'
  });
  form.parse(req, function (err, fields, files) {
    console.log(fields, files, 'fields2')
    if (err) {
    } else {
      res.json({ imgSrc: files.image[0].path.replace("public\\", "") })
    }
  });
});

module.exports = router;
