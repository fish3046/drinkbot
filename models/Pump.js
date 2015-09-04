var mongoose = require('mongoose');

exports.PumpSchema = new mongoose.Schema({
	order: { type: Number, required: true },
	pin: { type: Number, required: true },
	ingredient: { type: String, required: false },
	ml_per_minute: { type: Number, required: true }
});