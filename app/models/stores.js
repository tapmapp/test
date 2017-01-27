var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Merchants = require('./merchants');

var storesSchema = new Schema({
	idStore: {
		type: String,
		index: true
	},
	idOwner: {type: Schema.ObjectId, ref: "Merchants"},
	email: String,
	phone: String,
	name: String,
	ownerNAme: String,
	ownerLastName: String,
	address: String,
	postalCode: String,
	city: String,
	country: String,
	nationality: String,
	status: String,
	img: String,
	registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stores', storesSchema);