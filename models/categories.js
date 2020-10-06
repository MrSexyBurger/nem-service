const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// установка схемы

const categoriesScheme = new Schema({
	title: String,
});

module.exports = mongoose.model("categories", categoriesScheme);