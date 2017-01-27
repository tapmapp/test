var mongoose = require('mongoose');

module.exports = mongoose.model('Categories', {
	idCategory: {
		type: String,
		index: true
	},
	name: String
});