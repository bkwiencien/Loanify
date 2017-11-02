var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var sequelize = require('sequelize');
var exphbs = require("express-handlebars");

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'assets')));

app.use(methodOverride('_method'));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({extended: false}));

var routes = require('./controllers/controller.js');
app.use("/", routes);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});