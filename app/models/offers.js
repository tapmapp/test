var mongoose = require('mongoose');

module.exports = mongoose.model('Sales', {
	idOwner: {
		type: String,
		index: true
	},
	idOffer: String,
	idProduct: String,
	offerType: Number,
	startDate: {type:Date},
	endDate: {type:Date},
	price: Number,
	quantity: Number
});