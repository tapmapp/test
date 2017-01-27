var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var companieSchema = new Schema({
	//idClient: String,
	//idStore: {type: Schema.ObjectId, ref: "Stores"},
	name: String,
	email: {type: String, required: true},
	password: {type: String, required:true},
	img: {type:String},
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

companieSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

companieSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Companie', companieSchema);