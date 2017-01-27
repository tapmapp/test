// Inicialización
var express  = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var validator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
//var csrf = require('csurf');

//INIT APP
var app      = express(); 							// Utilizamos express
var mongoose = require('mongoose'); 				// mongoose para mongodb
var port  	 = process.env.PORT || 8080; 			// Cogemos el puerto 8080

// Hacemos la conexión a la base de datos de Mongo con nombre "MeanExample"
mongoose.connect('mongodb://localhost:27017/EjemploMEAN'); 	
require('./config/passport');

// Configuracion
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(validator());
app.use(session({secret: 'whola', resave: false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(flash());

//app.use(csrf());

app.use('/', express.static('public'));
app.use('/', express.static('views'));

//GLOBAL VARS
app.use(function(req, res, next) {
	//res.locals.messages = req.flash();
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});


var wholaRoutes = require('./app/routes/index');
var clientsRoutes = require('./app/routes/clients');
var merchantsRoutes = require('./app/routes/merchants');
var companiesRoutes = require('./app/routes/companies')
/* API */
var wholaApi = require('./app/routes/api');

app.use('/', wholaRoutes);
app.use('/users', clientsRoutes);
app.use('/merchants', merchantsRoutes);
app.use('/companies', companiesRoutes);
/* API */
app.use('/api', wholaApi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.redirect('/not-found');
});

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto " + port);