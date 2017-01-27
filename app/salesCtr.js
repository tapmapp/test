var Sales = require('./models/sales');

// Obtiene todos los objetos Persona de la base de datos
exports.getSales = function (req, res){
	
	Sales.find(
		function(err, sales) {
			if (err)
				res.send(err)
					res.json(sales); // devuelve todas las Personas en JSON		
				}
			);
}

// Guarda un objeto Persona en base de datos
exports.setSales = function(req, res) {

		// Creo el objeto Persona
		Sales.create(
			{ idProduct : req.body.idProduct, idCompany: req.body.idCompany, brand: req.body.brand, name: req.body.name, price: req.body.price, expiryDate: new Date() }, 
			function(err, sales) {
				if (err)
					res.send(err);

				// Obtine y devuelve todas las personas tras crear una de ellas
				Sales.find(function(err, sales) {
				 	if (err)
				 		res.send(err)
				 	res.json(sales);
				});
			});

	}

// Modificamos un objeto Persona de la base de datos
exports.updateSales = function(req, res){
	Sales.update( {_id : req.params.sale_id},
					{$set:{ idProduct : req.body.idProduct, idCompany: req.body.idCompany, brand: req.body.brand, name: req.body.name, price: req.body.price, expiryDate: new Date() }}, 
					function(err, sales) {
						if (err)
							res.send(err);

				// Obtine y devuelve todas las personas tras crear una de ellas
				Sales.find(function(err, sales) {
				 	if (err)
				 		res.send(err)
				 	res.json(sales);
				});
			});
	}

// Elimino un objeto Persona de la base de Datos
exports.removeSales = function(req, res) {
	Sales.remove({_id : req.params.sale_id}, function(err, sales) {
		if (err)
			res.send(err);

			// Obtine y devuelve todas las personas tras borrar una de ellas
			Sales.find(function(err, sales) {
				if (err)
					res.send(err)
				res.json(sales);
			});
		});
}