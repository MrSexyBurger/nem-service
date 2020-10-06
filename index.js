const express = require("express"); // подключаем express
const expressHbs = require("express-handlebars"); // подключаем express-handlebars

const bodyParser = require("body-parser"); // для обмена данными
const mongoose = require("mongoose"); // подключили mongoose

const homeRouter = require("./routes/homeRouter.js"); // подключаем роутер homeRouter
const repairRouter = require("./routes/repairRouter.js"); // подключаем роутер repareRouter


const path = require('path');

const jsonParser = express.json(); // для ajax


// для отсутствия ошибки
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express(); // создаем объект express


app.use(express.static(__dirname + "/public")); // подключаем статические файлы


app.set("view engine", "hbs"); // указываем hbs в качестве движка представлений

app.engine('handlebars', expressHbs(
	{
		defaultLayout: "layout",
		layoutsDir: path.join( __dirname, "views/layouts"),
		partialsDir: path.join( __dirname, "views/partials"),
		handlebars: allowInsecurePrototypeAccess(Handlebars),

		// create custom helpers
		helpers: {
			score: function(value){
				// пример хелперов
			}
			
		}
	}
));

app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false })); // настраиваем bodyparser


app.use("/", homeRouter); // указываем начальную точку для homeRouter
app.use("/repair", repairRouter); // указываем начальную точку для repairRouter


app.use(function(req, res, next){
	res.status(404).send("Not Found");
}); // отправляем на страницу 404




mongoose.connect("mongodb://localhost:27017/mvcdb", {useNewUrlParser: true}, function(err){
	if (err) return console.log(err);
	
	app.listen(3000, function(){
		console.log("Сервер ожидает подключения...");
	});
});