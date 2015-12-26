var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var postSchema = new mongoose.Schema({
    title: String,
	createdBy: String,
	createdDate: Date,
	lastUpdated: Date,
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
	website: String,
	facebook: String,
	twitter: String,
	instagram: String
	
});


module.exports = mongoose.model('Post', postSchema);

