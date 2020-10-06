const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// установка схемы

const causeScheme = new Schema({
	title: String,
	price: Number,
	category: String
});

module.exports = mongoose.model("cause", causeScheme);