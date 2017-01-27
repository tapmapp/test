var express = require('express');
var router = express.Router();
//var csrf = require('csurf');
var passport = require('passport');

//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get('/', function(req, res, next) {
	res.render('../views/pages/home', {headerMenu:'users'});
});

router.get('/services', function(req, res, next) {
	res.render('../views/pages/services', {headerMenu:'users'});
});

router.get('/blog', function(req, res, next) {
	res.render('../views/pages/blog', {headerMenu:'users'});
});

router.get('/us', function(req, res, next) {
	res.render('../views/pages/us', {headerMenu:'users'});
});

router.get('/contact', function(req, res, next) {
	res.render('../views/pages/contact', {headerMenu:'users'});
});

router.get('/not-found', function(req, res, next) {
	res.render('../views/pages/notFound', {headerMenu:'users'});
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/profile');
}