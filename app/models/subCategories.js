var mongoose = require('mongoose');
var Schema = moongoose.Schema;

/*
	
REFRESCOS: 1
AGUAS: 2
CERVEZAS: 3
VINOS: 4
ALCOHOLES Y LICORES: 5
CAVA, CHAMPAGNE Y SIDRA: 6
TÓNICAS, GASEOSAS Y BITTER: 7
ZUMOS, NÉCTARES Y MOSTOS: 8
ENERGÉTICAS E ISOTÓNICAS: 9	
	
*/

module.exports = mongoose.model('SubCategories', {
	idSubCategory: String,
	idCategory: {type: Schema.ObjectId, red: "Categories"},
	name: String
});