const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// установка схемы

const userScheme = new Schema({
	username: String,
	userage: Number
});

module.exports = mongoose.model("user", userScheme);