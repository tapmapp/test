var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var activitySchema = new Schema({
	//idClient: String,
	//idStore: {type: Schema.ObjectId, ref: "Stores"},
	/*
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
	registrationDate: { type: Date, default: Date.now }*/
});

module.exports = mongoose.model('Activity', activitySchema);