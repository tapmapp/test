var Client = require('../models/clients.js');

// Obtiene todos los objetos Persona de la base de datos
exports.getClientInfo = function (req, res) {
	Client.find({_id: req.session.passport.user}).exec(function(err, clientInfo) {
		if(err)
			res.send(err);
		console.log(clientInfo);
		res.json(clientInfo);
	});
}


exports.getClientActivity = function (req, res) {
	Client.find({_id: req.session.passport.user}).exec(function(err, clientInfo) {
		if(err)
			res.send(err);
		console.log(clientInfo);
		res.json(clientInfo);
	});
}
/*
name: String,
email: {type: String, required: true},
password: {type: String, required:true},
lastName: String,
address: String,
postalCode: String,
city: String,
country: String,
nationality: String,
status: String,
avgSalary: Number,
registrationDate: { type: Date, default: Date.now }
*/

exports.updateClientInfo = function (req, res) {
	
	console.log(req.body.email);
	
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    
    var errors = req.validationErrors();
    
	if (errors) {
        var messages = [];
        errors.forEach(function(error) {
			console.log(error.msg);
        	messages.push(error.msg);
        });
		//res.redirect('/users/account');
		//req.flash('error', { messages: messages, hasErrors: messages.length > 0});
		//res.send('/users/account', { messages: messages, hasErrors: messages.length > 0});
		//res.send('/users/account', { messages: req.flash('error', messages), hasErrors: messages.length > 0} );
       
    	//req.flash('error', messages);
		res.send(messages);
    } else {
		res.json(req.body);
	}
	

	/*
	Client.update( {_id : req.session.passport.user},
		{$set:{ 
			email: req.body.email,
			//password: req.body.password,
			name : req.body.name,
			lastName: req.body.lastName,
			birth:req.body.birth,
			nationality: req.body.nationality,
			genre: req.body.genre,
			status: req.body.status,
			phone: req.body.phone,
			address: req.body.address,
			postalCode: req.body.pc,
			city: req.body.city,
			country: req.body.country,
			job: req.body.job,
			avgSalary: req.body.avgSalary,
			registrationDate: req.body.registrationDate
		}}, 
		function(err, products) {
			if (err)
				res.send(err);

	    Client.findOne({_id : req.session.passport.user}, function (err, user) {
			if(err)
				res.send(err);
			console.log(user);
			res.json(user);
	    });
	});*/
}
