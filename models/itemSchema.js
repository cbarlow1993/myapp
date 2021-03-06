var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var itemSchema = new mongoose.Schema({
    name: String,
	alternateName: String,
	description: String,
	logo: String,
	phone: Number,
	address: {
		firstLine: String,
		secondLine: String,
		postcode: String,
		latitude: Number,
		longitude: Number
	},
	created: { type: Date, default: Date.now },

	
});


module.exports = mongoose.model('Item', itemSchema);

