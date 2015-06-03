var mongoose = require('mongoose');
// This is the setup for the attributes we want the applicant to have:
var applicantsSchema = mongoose.Schema({
	name: String,
	position: String,
	bio: String,
	skills: Array,
	years: Number,
	why: String,
	url: String,
	documentPath: String
});

module.exports = mongoose.model('applicant', applicantsSchema);
