var Products = require('./models/products');
var Categories = require('./models/categories');

// Obtiene todos los objetos Persona de la base de datos
exports.getProducts = function (req, res) {
	
	var tipo = req.query.tipo;
	var orden = req.query.orden;
	var string = '{"' + tipo + '":' + orden + '}'
	var order = JSON.parse(string);
	
	Products.find({},null,{sort:order}).exec(function(err, products){
		Categories.populate(products, {path:"idCategory", select:"name"},function(err, products){
			if(err)
				res.send(err);
			console.log(products);
			res.json(products);
		});
		
	});
}

// Guarda un objeto Persona en base de datos
exports.setProducts = function(req, res) {

	// Creo el objeto Persona
	Products.create(
		{ idProduct : req.body.idProduct, idCompany: req.body.idCompany, idCategory: req.body.idCategory, brand: req.body.brand, name: req.body.name, price: req.body.price, buyPrice: req.body.buyPrice, stock: req.body.stock, expiryDate: new Date() }, 
		function(err, products) {
			if (err)
				res.send(err);

		Products.find({},null,{sort:{brand:1}}).exec(function(err, products){
			Categories.populate(products, {path:"idCategory"},function(err, products){
				if(err)
					res.send(err);
				console.log(products);
				res.json(products);
			});

		});
	});
}

// Modificamos un objeto Persona de la base de datos
exports.updateProducts = function(req, res){
	
	Products.update( {_id : req.params.product_id},
		{$set:{ idProduct : req.body.idProduct, idCompany: req.body.idCompany, idCategory: req.body.idCategory, brand: req.body.brand, name: req.body.name, price: req.body.price, buyPrice: req.body.buyPrice, stock: req.body.stock, expiryDate: new Date() }}, 
		function(err, products) {
			if (err)
				res.send(err);

		Products.find({},null,{sort:{brand:1}}).exec(function(err, products){
			Categories.populate(products, {path:"idCategory"},function(err, products){
				if(err)
					res.send(err);
				console.log(products);
				res.json(products);
			});

		});
	});
}

// Elimino un objeto Persona de la base de Datos
exports.removeProducts = function(req, res) {
	Products.remove({_id : req.params.product_id}, function(err, products) {
		if (err)
			res.send(err);

			// Obtine y devuelve todas las personas tras borrar una de ellas
		Products.find({},null,{sort:{brand:1}}).exec(function(err, products){
			Categories.populate(products, {path:"idCategory"},function(err, products){
				if(err)
					res.send(err);
				console.log(products);
				res.json(products);
			});

		});
	});
}