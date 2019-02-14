var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({products: [{name: 'Hamburger', description: 'Just a normal ol\' hamburger'}]});
});

module.exports = router;
