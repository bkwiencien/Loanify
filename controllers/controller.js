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
  router.get('/signup', function(req, res){
  return res.render('signup');
 });
  router.post('/signupnow', function(req,res){
    db.user.create({
      user: req.body.user,
      password: req.body.password
    }).then(function(login){
      console.log(login.user);
      res.redirect('/');
    })

  });

  router.get('/login', function(req, res){
    
  })

  router.post('/toto',function(req,res){
    var dataValid = true;
    var mess ="";
    var errorMessage = {
      message: mess
    }
    errorMessage.message = checkValidity(req.body);
    if (errorMessage.message.length == 0){
      dataValid=true;
    } else {
      dataValid=false;
    }
    if (dataValid){
    array = doCalculations(req.body);
    var dataobj  = {
      data: array
    }
    res.render('results',dataobj);
  } else {
    res.render('errors',errorMessage)
  }
  });
  function checkValidity(arg) {
    var messo = "";
    currentPrincipal = parseFloat(arg.currentprincipal);
    monthlyPayment = parseFloat(arg.mpayment);
    interestRate = parseFloat(arg.interestrate);
    additionalPrincipal = parseFloat(arg.additional);
    if (currentPrincipal <= 0) {
       messo = "outstanding balance must be > 0";
       return(messo);
    }
    if (interestRate >= 1) {
       messo = "interest rate  must be  < 1";
       return(messo);
    }
    if (monthlyPayment <= 0) {
       messo = "monthly payment   must be  positive";
       return(messo);
    }
    return(messo);
  }
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
    var paymentNumber = 0;
    var currentPrincipal = 0;
    var monthlyPayment = 0;
    var interestRate = 0;
    var additionalPrincipal = 0;
    var totalInterest = 0;
    currentPrincipal = parseFloat(argo.currentprincipal);
    monthlyPayment = parseFloat(argo.mpayment);
    interestRate = parseFloat(argo.interestrate);
    additionalPrincipal = parseFloat(argo.additional);
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