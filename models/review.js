const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// установка схемы

const reviewScheme = new Schema({
	username: String,
	review: String,
	rating: Number
});

module.exports = mongoose.model("review", reviewScheme);