const mongoose = require("mongoose")

const NasaNewsSchema = new mongoose.Schema({
	date:{type: String, required: true},
	explanation:{type: String, required: true},
	hdurl:{type: String, required: true},
	media_type:{type: String, required: true},
	service_version:{type: String, required: true},
	title:{type: String, required: true},
	url:{type: String, required: true},
})

module.exports = mongoose.model('nasanews', NasaNewsSchema)