const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// установка схемы

const repairScheme = new Schema({
	title: String,
	price: Number,
	category: String
});

module.exports = mongoose.model("repair", repairScheme);