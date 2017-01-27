var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Categories = require('./categories');

var productsSchema = new Schema({
	idProduct: {
		type: String,
		index: true
	},
	idCompany : String,
	idCategory: {type: Schema.ObjectId, ref: "Categories"},
	brand: String,
	name: String,
	price: Number,
	buyPrice: Number,
	stock: Number,
	img: String,
	expiryDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products', productsSchema);