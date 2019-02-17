var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({products: [{name: 'McDonalds', description: 'Food'}]});
});

module.exports = router;
