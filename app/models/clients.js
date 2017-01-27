var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var clientSchema = new Schema({
	//idClient: String,
	//idStore: {type: Schema.ObjectId, ref: "Stores"},
	
	email: {type: String, required: true},
	password: {type: String, required:true},
	name: String,
	lastName: String,
	birth: String,
	nationality: String,
	genre: String,
	status: String,
	phone: String,
	address: String,
	postalCode: String,
	city: String,
	nationality: String,
	job: String,
	avgSalary: Number,
	registrationDate: { type: Date, default: Date.now }
});

clientSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

clientSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Client', clientSchema);