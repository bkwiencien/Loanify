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
 	return res.render('calculator');
 });
  router.post('/toto',function(req,res){
    console.log("hello lizard lips");
    console.log("in post " + req.body);
  });


module.exports = router;