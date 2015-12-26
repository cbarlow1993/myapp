var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var locationSchema = new mongoose.Schema({
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
	state: String,
	created: { type: Date, default: Date.now },
	website: String,
	facebook: String,
	twitter: String,
	instagram: String,
	openingHouse: {
		monday: {
			
		},
		tuesday: {
			
		},
		wednesday: {
			
		},
		thursday: {
			
		},
		friday: {
			
		},
		saturday: {
			
		},
		sunday: {
			
		}
		
	}
	
});


module.exports = mongoose.model('Location', locationSchema);

