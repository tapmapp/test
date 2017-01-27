var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var merchantSchema = new Schema({
	//idClient: String,
	//idStore: {type: Schema.ObjectId, ref: "Stores"},
	name: String,
	email: {type: String, required: true},
	password: {type: String, required:true},
	/*lastName: String,
	address: String,
	postalCode: String,
	city: String,
	country: String,
	nationality: String,
	status: String,
	avgSalary: Number,
	img: String,*/
	registrationDate: { type: Date, default: Date.now }
});

merchantSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

merchantSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Merchant', merchantSchema)