 var express = require('express');

 var router = express.Router();

 var db = require('../models');

 router.get('/', function(req, res){
 	res.redirect('/home');
 });

 router.get('/home', function(req, res){
 	return res.render('index');
 });

  router.get('/calculator', function(req, res){
 	return res.render('index');
 });


module.exports = router;