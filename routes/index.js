var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'obaka',
    password: process.env.DB_PASS || 'obaka',
    database: process.env.DB_NAME || 'bht'
});

/* GET home page. */
router.get('/', function(req, res) {
    var sql    = 'SELECT * FROM lp_msg ORDER BY id DESC LIMIT 10';
    pool.query(sql, function(err, results) {
          if(err) return console.error(err);
  res.render('index', { title: 'Express', results:results });
    });
});

/* GET home page. */
router.get('/post', function(req, res) {
  res.render('post', { title: 'Post' });
});

router.get('/get_post', function(req, res) {
    var sql    = 'SELECT * FROM lp_msg limit 1';
    pool.query(sql, function(err, results) {
          if(err) return console.error(err);
          res.json(results);
    });
});

/* mock. */
router.get('/mock', function(req, res) {
  res.render('mock', { title: 'mock' });
});

/* mock. */
router.get('/mockdetail', function(req, res) {
  res.render('mock-detail', { title: 'mock detal' });
});

module.exports = router;
