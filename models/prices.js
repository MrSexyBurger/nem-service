const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// установка схемы

const pricesScheme = new Schema({
	title: String,
	price: Number,
	category: String
});

module.exports = mongoose.model("prices", pricesScheme);