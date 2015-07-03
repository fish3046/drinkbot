var mongoose = require('mongoose');

exports.DrinkSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: false },
	ingredients: [{
		name: String,
		desc: String,
		pump_time: Number,
		pump_start_delay: Number
	}]
});