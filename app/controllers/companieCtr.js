var Companie = require('../models/companies');

// Obtiene todos los objetos Persona de la base de datos
exports.getCompanieInfo = function (req, res, next) {
	var companieName = req.params.name;
	companieName = companieName.replace('-', ' ');
	Companie.find({name: companieName}).exec(function(err, companieInfo) {
		if(err) {
			res.redirect('/not-found');
		} else {
			if(companieInfo.length == 0){
				res.redirect('/not-found');
			} else {
				res.render('../views/pages/companies/companie-account', {headerMenu:'companies', companyInfo: companieInfo[0]});
			}
		}
	});
}
