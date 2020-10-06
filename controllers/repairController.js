const repairModel = require("../models/repair.js"); //  модель с ценами
const causeModel  = require("../models/cause.js"); // модель с шестерёнками
////////////////////////////////////////////////////////////////////////

exports.fridge = function(request, response){
	response.render("fridge.handlebars", {
		title: "Холодильники"
	});
};

exports.washing = function(request, response){
	response.render("washing.handlebars", {
		title: "Стиральные машины"
	});
};

exports.dishwasher = function(request, response){
	response.render("dishwasher.handlebars", {
		title: "Посудомоечные машины"
	});
};

exports.electric_stove = function(request, response){
	response.render("electric_stove.handlebars", {
		title: "Электроплиты"
	});
};

exports.hob = function(request, response){
	response.render("hob.handlebars", {
		title: "Варочные панели"
	});
};

exports.oven = function(request, response){
	response.render("oven.handlebars", {
		title: "Духовые шкафы"
	});
};

/////////////////////////////////////////////////////////////////////////

exports.postprice = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const title = request.body.title;
	const price = request.body.price;
	const category = request.body.category;

	const Repair = new repairModel({title: title, price: price, category: category});
	
	Repair.save(function(err,data){
		if(err) return console.log;
		response.send("Цена добавлена!");
		console.log(data)
	});
}

exports.getprices = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	const category = request.query.category;

	repairModel.find({category: category}, function(err, prices){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(prices);
	})
}

exports.getprice = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	const id = request.query.id;

	repairModel.findOne({_id: id}, function(err, price){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(price);
	})
}

exports.deleteprice = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	const id = request.body.id;

	console.log(id)

	repairModel.deleteOne({_id: id}, function(err, result){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send("Цена удалена");
	})
}

exports.editprice = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const title = request.body.title;
	const price = request.body.price;
	const id = request.body.id;

	repairModel.update({_id: id}, {$set: { title: title, price: price }}, {strict: false, new: true}, function(err){
		if(err) return console.log;
		response.send("Цена изменена!");
	})
};

////////////////////////////////////////////////////////////////////////////////////////////

exports.postcause = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const title = request.body.title;
	const price = request.body.price;
	const category = request.body.category;

	const Cause = new causeModel({title: title, price: price, category: category});
	
	Cause.save(function(err,data){
		if(err) return console.log;
		response.send("Цена добавлена!");
		console.log(data)
	});
}

exports.getcauses = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	const category = request.query.category;

	causeModel.find({category: category}, function(err, prices){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(prices);
	})
}

exports.getcause = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	const id = request.query.id;

	causeModel.findOne({_id: id}, function(err, price){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(price);
	})
}

exports.deletecause = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	const id = request.body.id;

	causeModel.deleteOne({_id: id}, function(err, result){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send("Цена удалена");
	})
}

exports.editcause = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const title = request.body.title;
	const price = request.body.price;
	const id = request.body.id;

	causeModel.update({_id: id}, {$set: { title: title, price: price }}, {strict: false, new: true}, function(err){
		if(err) return console.log;
		response.send("Цена изменена!");
	})
};

