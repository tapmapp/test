var mongoose = require('mongoose');

module.exports = mongoose.model('Sales', {
	idOrder: {
		type: String,
		index: true
	},
	idUser: String,
	idProducto: String,
	date: String,
	price: Number,
	quantity: Number
});