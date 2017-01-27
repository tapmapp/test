var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Client = require('../models/clients.js');
var ClientCtrl = require('../controllers/clientsCtr.js');
var Activity = require('../models/activity.js');
var ActivityCtrl = require('../controllers/activityCtr.js');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) {
	res.render('../views/pages/users/users', {headerMenu:'users'});
});

//PROFILE
router.get('/account', isLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
	res.render('../views/pages/users/account', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'users', clientMenu: 'account'});
});

router.get('/offers', isLoggedIn, function(req, res, next) {
	res.render('../views/pages/users/offers', {headerMenu:'users', clientMenu: 'offers'});
});

router.get('/activity', isLoggedIn, function(req, res, next) {
	res.render('../views/pages/users/activity', {headerMenu:'users', clientMenu: 'activity'});
});

router.get('/stores', isLoggedIn, function(req, res, next) {
	res.render('../views/pages/users/stores', {headerMenu:'users', clientMenu: 'stores'});
});

router.get('/friends', isLoggedIn, function(req, res, next) {
	res.render('../views/pages/users/friends', {headerMenu:'users', clientMenu: 'friends'});
});

router.get('/login', notLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
	console.log(req.session);
	res.render('../views/pages/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'users', accountType: 'users'});
});

router.post('/login', passport.authenticate('local.login-user', {
    failureRedirect: '/users/login',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/users/account');
    }
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logOut();
    res.redirect('/users/login');
});

//REGISTER
router.get('/register', function(req, res, next) {
	var messages = req.flash('error');
	res.render('../views/pages/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'users', accountType: 'users'});
});

router.post('/register', passport.authenticate('local.register-user', {
    failureRedirect: '/users/register',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/users/account');
    }
});

router.get('/getClientInfo', isLoggedIn, ClientCtrl.getClientInfo);
router.get('/getClientActivity', isLoggedIn, ClientCtrl.getClientActivity);
router.put('/saveUser/:user_id', isLoggedIn, ClientCtrl.updateClientInfo);
//ClientCtrl.updateClientInfo);

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
    res.redirect('/users/account');
}