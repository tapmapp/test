var Categories = require('./models/categories');

// Obtiene todos los objetos Categoria de la base de datos
exports.getCategories = function (req, res){
	
	Categories.find({},null,{sort:{name:1}}).exec(function(err, categories){
			if (err)
				res.send(err)
				console.log(categories);
					res.json(categories); // devuelve todas las Personas en JSON		
		}
	);
}

// Guarda un objeto Categoria en base de datos
exports.setCategory = function(req, res) {

	Categories.create(
		{ idCategory : req.body.idCategory, name: req.body.name }, 
		function(err, categories) {
			if (err)
				res.send(err);

		// Obtine y devuelve todas las personas tras crear una de ellas
		Categories.find(function(err, categories) {
		 	if (err)
		 		res.send(err)
		 	res.json(categories);
		});
	});

}

// Modificamos un objeto Categoria de la base de datos
exports.updateCategory = function(req, res) {
	
	Categories.update( {_id : req.params.category_id},
		{$set:{ idCategory : req.body.idCategory, name: req.body.name }}, 
		function(err, categories) {
			if (err)
				res.send(err);

		// Obtine y devuelve todas las Categorias tras crear una de ellas
		Categories.find(function(err, categories) {
		 	if (err)
		 		res.send(err)
		 	res.json(categories);
		});
	});
}

// Elimino un objeto Categoria de la base de Datos
exports.removeCategory = function(req, res) {
	
	Categories.remove({_id : req.params.category_id}, function(err, categories) {
		if (err)
			res.send(err);

		// Obtine y devuelve todas las personas tras borrar una de ellas
		Categories.find(function(err, categories) {
			if (err)
				res.send(err)
			res.json(categories);
		});
	});
}