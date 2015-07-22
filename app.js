// EXPRESS SYSTEM
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var ejsLayouts = require('express-ejs-layouts');

// BACKEND MODULES
//var robot = require('./modules/robot');
var drinkdb = require('./modules/drink_library');

var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/drinkbot");

var DrinkSchema = require('./models/Drink.js').DrinkSchema;
var Drink = db.model('drinks', DrinkSchema);
var IngredientSchema = require('./models/Ingredient.js').IngredientSchema;
var Ingredient = db.model('ingredients', IngredientSchema);

//robot.init(drinkdb.pumps);

// ROUTING
var routes = require('./routes/index');
var drinks = require('./routes/drinks');
var dbroutes = require('./routes/db');

// APPLICATION INSTANCE
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(ejsLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ***** ROUTES *****
app.use('/', routes);

app.get('/db/drink', dbroutes.getAllGeneric(Drink));
app.get('/db/drink/:id', dbroutes.getGeneric(Drink));
app.post('/db/drink', dbroutes.postGeneric(Drink));
app.delete('/db/drink/:id', dbroutes.deleteGeneric(Drink));

app.get('/db/ingredient', dbroutes.getAllGeneric(Ingredient));
app.get('/db/ingredient/:id', dbroutes.getGeneric(Ingredient));
app.post('/db/ingredient', dbroutes.postGeneric(Ingredient));
app.delete('/db/ingredient/:id', dbroutes.deleteGeneric(Ingredient));
// ***** END ROUTES *****


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.jade', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.jade', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
var gracefulShutdown = function() {
	robot.shutdown();

	console.log("Received kill signal, shutting down gracefully.");

	process.exit();
	//app.close(function() {
	//	console.log("Closed out remaining connections.");
	//	process.exit()
	//});

	// if after
	//setTimeout(function() {
	//	console.error("Could not close connections in time, forcefully shutting down");
	//	process.exit()
	//}, 10000);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
