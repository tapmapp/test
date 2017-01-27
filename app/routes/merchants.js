var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Merchant = require('../models/merchants.js');

var csrfProtection = csrf();
router.use(csrfProtection);

var ProductsCtr = require ('./../productsCtr');
var CategoriesCtr = require ('./../categoriesCtr');

/* MERCHANTS */	
router.get('/', function(req, res) {
	res.render('../views/pages/merchants/merchants', {headerMenu:'merchants'} );
});

router.get('/stores', function(req, res) {
	res.render('../views/pages/merchants/stores', {headerMenu:'merchants', merchantMenu:'stores'} );
});

router.get('/campaign', function(req, res) {
	res.render('../views/pages/merchants/merchant-campaign', {headerMenu:'merchants', merchantMenu:'campaign'} );
});

router.get('/products', function(req, res) {
	res.render('../views/pages/merchants/merchant-products', {headerMenu:'merchants', merchantMenu:'products'});
});

router.get('/clients', function(req, res) {
	res.render('../views/pages/merchants/merchant-clients', {headerMenu:'merchants', merchantMenu:'clients'});
});

router.get('/sales', function(req, res) {
	res.render('../views/pages/merchants/merchant-sales', {headerMenu:'merchants', merchantMenu:'sales'});
});

router.get('/research', function(req, res) {
	res.render('../views/pages/merchants/merchant-research', {headerMenu:'merchants', merchantMenu:'research'});
});

router.get('/combo', function(req, res) {
	res.render('../views/pages/merchants/merchant-combo', {headerMenu:'merchants', merchantMenu:'campaign', menuTitle: 'combo'} );
});

router.get('/register', function(req, res, next) {
	var messages = req.flash('error');
	res.render('../views/pages/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'merchants', accountType: 'merchants'});
});

router.post('/register', passport.authenticate('local.register-merchant', {
    failureRedirect: '/merchants/register',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/merchants/account');
    }
});

router.get('/login', notLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
	console.log(req.session);
	res.render('../views/pages/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, headerMenu:'merchants', accountType: 'merchants'});
});


// devolver todos los Producto
router.get('/api/product', ProductsCtr.getProducts);
// Crear una nueva Producto
router.post('/api/product', ProductsCtr.setProducts);
// Modificar los datos de una Producto
router.put('/api/product/:product_id', ProductsCtr.updateProducts);
// Borrar una Producto
router.delete('/api/product/:product_id', ProductsCtr.removeProducts);

// devolver todas las Categorias
router.get('/api/category', CategoriesCtr.getCategories);
// Crear una nueva Categoria
router.post('/api/category', CategoriesCtr.setCategory);
// Modificar los datos de una Categoria
router.put('/api/category/:category_id', CategoriesCtr.updateCategory);
// Borrar una Categoria
router.delete('/api/category/:category_id', CategoriesCtr.removeCategory);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/merchants/login');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/merchants/account');
}