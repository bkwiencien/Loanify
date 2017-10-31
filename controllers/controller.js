 var express = require('express');

 var router = express.Router();

 var db = require('..models/');

 router.get('/', function(req, res){
 	res.redirect('/index');
 });

 router.get('/calculator', function(req, res){
 	res.redirect('/calculator');
 })