var mongoose = require('mongoose');
// This is the setup for the attributes we want the applicant to have:
var itemsSchema = mongoose.Schema({
	title: String,
	description: String,
	cost: Number,
	imagePath: String
});

module.exports = mongoose.model('item', itemsSchema);
