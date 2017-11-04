 var express = require('express');

 var router = express.Router();

 var db = require('../models');

 var array = [];

 router.get('/', function(req, res){
 	res.redirect('/home');
 });

 router.get('/home', function(req, res){
 	return res.render('index');
 });

  router.get('/calculator', function(req, res){
 	return res.render('calculator');
 });

  router.get('/signup', function(req,res){
    db.User.create({
      user: req.body.user,
      password: req.body.password
    }).then(function(login){
      console.log(login);
      res.redirect('/');
    })

  });

  router.get('/login', function(req, res){
    
  })

  router.post('/toto',function(req,res){
    console.log("hello lizard lips");
    console.log("in post " + req.body.label);
    array = doCalculations(req.body);
    //res.send(array);
    var dataobj  = {
      data: array
    }
    console.log(dataobj);
    res.render('results',dataobj);
  });
  function doCalculations(argo) {
    var rows = [];
    var row = {
         paymentnumber: 0,
         principal:     0,
         interest:      0,
         monthlypayment: 0
    };
    function Row(ppaymentnumber,pprincipal,pinterest,pmonthlypayment) {
      this.paymentnumber = ppaymentnumber;
      this.principal = pprincipal;
      this.interest = pinterest.toFixed(2);
      this.monthlypayment = pmonthlypayment;
    };
    var inter = 0;
    var interByMonth = 0;
    var myLabel = "";
    var paymentNumber = 0;
    var currentPrincipal = 0;
    var monthlyPayment = 0;
    var interestRate = 0;
    var additionalPrincipal = 0;
    var totalInterest = 0;
    myLabel = argo.label;
    currentPrincipal = parseFloat(argo.currentprincipal);
    monthlyPayment = parseFloat(argo.mpayment);
    interestRate = parseFloat(argo.interestrate);
    additionalPrincipal = parseFloat(argo.additional);
    console.log("in doCalculations label " + currentPrincipal + " " + interestRate);
    while (currentPrincipal > 0) {
        if ((monthlyPayment + additionalPrincipal) > currentPrincipal) {
            paymentNumber++;
            inter = parseFloat((currentPrincipal*interestRate));
            interByMonth = parseFloat(inter/12.0);
            totalInterest = totalInterest + interByMonth;
            var rr = new Row(paymentNumber,currentPrincipal,interByMonth,currentPrincipal);
            currentPrincipal = 0;
            rows.push(rr);
        }else {
          inter = parseFloat((currentPrincipal * interestRate));
          interByMonth = parseFloat(inter/12.0);
          currentPrincipal = parseFloat((currentPrincipal + interByMonth));
          currentPrincipal = currentPrincipal - monthlyPayment - additionalPrincipal;
         // currentPrincipal = Math.round(currentPrincipal,-2);
          currentPrincipal = currentPrincipal.toFixed(2);
          paymentNumber++;
          totalInterest = totalInterest + interByMonth;
          var rrr = new Row(paymentNumber,currentPrincipal,interByMonth,monthlyPayment+additionalPrincipal);
            rows.push(rrr);
          console.log(paymentNumber+ " " + currentPrincipal + " " + monthlyPayment + " "+ additionalPrincipal);
        }
    }
    return(rows);
}


module.exports = router;