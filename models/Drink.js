var mongoose = require('mongoose');

exports.DrinkSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: false },
	ingredients: [{
		name: { type: String, required: true },
		desc: String,
		pump_time: { type: Number, required: true },
		pump_start_delay: Number
	}]
});