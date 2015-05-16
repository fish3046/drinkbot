var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/make', function(req, res, next) {
    res.send('someting');
});

module.exports = router;
