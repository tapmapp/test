var passport = require('passport');
var Client = require('../app/models/clients');
var Merchant = require('../app/models/merchants');
var Companie = require('../app/models/companies');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	Client.findById(id, function(err, user){
		done(err, user);
	});
});

passport.use('local.register-user', new LocalStrategy({
	usernameField: 'email',
	password: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
    
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	
	console.log(req.body.email);
	console.log(req.body.password);
	
    var errors = req.validationErrors();
    
	if (errors) {
        var messages = [];
        errors.forEach(function(error) {
           messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    } else {
	
		Client.findOne({'email': email}, function(err, user){
			if(err) return done(err);
			if(user) return done(null, false, {message: 'Email is already in use.'});
			
			var newClient = new Client();
			newClient.email = email;
			newClient.password = newClient.encryptPassword(password);
			newClient.save(function(err, result){
				if(err) return done(err);
				
				return done(null, newClient);
			});
		});
		
	}
}));

passport.use('local.login-user', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
	
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	
	console.log(req.body.email);
	console.log(req.body.password);
	
    var errors = req.validationErrors();
	
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Client.findOne({'email': email}, function (err, user) {
		if(err) return done(err);
		if(!user) return done(null, false, {message: 'Not user found.'});
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
		//req.session.user;
        return done(null, user);
    });
}));

passport.use('local.login-merchant', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
	
	//req.checkBody('name', 'Invalid email').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	
	console.log(req.body.email);
	console.log(req.body.password);
	
    var errors = req.validationErrors();
	
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Merchant.findOne({'email': email}, function (err, merchant) {
		if(err) return done(err);
		if(!companie) return done(null, false, {message: 'Not user found.'});
        if (!companie.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
		//req.session.user;
		console.log(merchant);
        return done(null, merchant);
    });
}));

passport.use('local.register-merchant', new LocalStrategy({
	usernameField: 'email',
	password: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
    
	var name = req.body.name;
	
	req.checkBody('name', 'Invalid name').notEmpty();
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	
	console.log(req.body.name);
	console.log(req.body.email);
	console.log(req.body.password);
	
    var errors = req.validationErrors();
    
	if (errors) {
        var messages = [];
        errors.forEach(function(error) {
           messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    } else {
	
		Merchant.findOne({'email': email}, function(err, merchant){
			if(err) return done(err);
			if(merchant) return done(null, false, {message: 'Email is already in use.'});
			
			var newMerchant = new Merchant();
			newMerchant.name = name;
			newMerchant.email = email;
			newMerchant.password = newMerchant.encryptPassword(password);
			newMerchant.save(function(err, result){
				if(err) return done(err);
				
				return done(null, newMerchant);
			});
		});
		
	}
}));

passport.use('local.login-companie', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
	
	//req.checkBody('name', 'Invalid email').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	
	console.log(req.body.email);
	console.log(req.body.password);
	
    var errors = req.validationErrors();
	
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Companie.findOne({'email': email}, function (err, companie) {
		if(err) return done(err);
		if(!companie) return done(null, false, {message: 'Not user found.'});
        if (!companie.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
		//req.session.user;
		console.log(companie);
        return done(null, companie);
    });
}));

passport.use('local.register-companie', new LocalStrategy({
	usernameField: 'email',
	password: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
    
	var name = req.body.name;
	
	req.checkBody('name', 'Invalid name').notEmpty();
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	
	console.log(req.body.name);
	console.log(req.body.email);
	console.log(req.body.password);
	
    var errors = req.validationErrors();
    
	if (errors) {
        var messages = [];
        errors.forEach(function(error) {
           messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    } else {
	
		Companie.findOne({'email': email}, function(err, companie){
			if(err) return done(err);
			if(companie) return done(null, false, {message: 'Email is already in use.'});
			
			var newCompanie = new Companie();
			newCompanie.name = name;
			newCompanie.email = email;
			newCompanie.password = newCompanie.encryptPassword(password);
			newCompanie.save(function(err, result){
				if(err) return done(err);
				
				return done(null, newCompanie);
			});
		});
		
	}
}));
