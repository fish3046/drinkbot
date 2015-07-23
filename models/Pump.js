var mongoose = require('mongoose');

exports.PumpSchema = new mongoose.Schema({
	pin: { type: Number, required: true },
	ingredient: { type: String, required: false }
});