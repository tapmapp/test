var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var CompanieCtrl = require('../controllers/companieCtr.js');

var csrfProtection = csrf();
router.use(csrfProtection);
	
/* COMPANIES */
router.get('/', function(req, res) {
	res.render('../views/pages/companies/companies', {csrfToken: req.csrfToken(), headerMenu:'companies',messages: messages, hasErrors: messages.length > 0} );
});

router.get('/login', notLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
	console.log(req.session);
	res.render('../views/pages/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'companies', accountType: 'companies'});
});

router.post('/login', passport.authenticate('local.login-companie', {
    failureRedirect: '/companies/login',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
		
		var userName = req.user.name;
		var companieUrl = userName.replace(' ', '-');
		
        res.redirect('/companies/' + companieUrl);
    }
});

router.get('/register', function(req, res, next) {
	var messages = req.flash('error');
	res.render('../views/pages/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'companies', accountType: 'companies'});
});

router.post('/register', passport.authenticate('local.register-companie', {
    failureRedirect: '/companies',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
		var companieName = req.body.name;
		console.log(companieName);
		res.redirect('/companies/' + companieName);
    }
});

router.get('/:name', CompanieCtrl.getCompanieInfo);
	
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/companies/login');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/companies/account');
}
