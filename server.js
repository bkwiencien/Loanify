var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require('./models');

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});