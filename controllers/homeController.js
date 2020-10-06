//const user = require("../models/user.js"); // указываем на модель

const reviewModel = require("../models/review.js"); // указываем на модель с отзывами
const categoriesModel = require("../models/categories.js"); // модель на модель с категорияи
const pricesModel = require("../models/prices.js"); // модель на модель с ценами


exports.about = function(request, response){
	response.render("about.handlebars", {
		title: "О компании"
	});
};

exports.contacts = function(request, response){
	response.render("contacts.handlebars", {
		title: "Контакты"
	});
};



exports.prices = function(request, response){
	response.render("prices.handlebars", {
		title: "Цены"
	});
};

exports.index = function(request, response){
	response.render("index.handlebars", {
		title: "Сервисный центр \"Немецкий Сервис\""
	});
};


exports.review = function(request, response){
	reviewModel.find({}, function(err, allReviews){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.render("review.handlebars",{
			title: "Отзывы",
			reviews: allReviews
		});
	});
};



exports.getreviews = function(request, response){
	
	reviewModel.find({}, function(err, allReviews){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(allReviews);
	});
};

exports.getreview = function(request, response){
	
	reviewModel.findOne({_id: request.query.id}, function(err, review){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(review);
	});
};


exports.postreview = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const userName = request.body.username;
	const userReview = request.body.review;
	const userRating = request.body.rating;

	const Review = new reviewModel({username: userName, review: userReview, rating: userRating});
	
	Review.save(function(err){
		if(err) return console.log;
		response.send("Отзыв добавлен!");
	});
};

exports.editreview = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const userName = request.body.username;
	const userReview = request.body.review;
	const userRating = request.body.rating;
	const id = request.body.id;

	reviewModel.update({_id: id}, {$set: { username: userName, review: userReview, rating: userRating }}, {strict: false, new: true}, function(err){
		if(err) return console.log;
		response.send("Отзыв изменен!");
	})
};


exports.deletereview = function(request, response){
	const id = request.query.id;

	reviewModel.deleteOne({ _id: id}, function(err, result){
		if(err) return handleError(err);
		response.send("Отзыв с ID:\n" + id + "\nуспешно удалён");
	})
}





//////////////////////////////////
//////////////////////////////////
//////////////////////////////////


exports.postcategory = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const title = request.body.title;
	
	const Сategories = new categoriesModel({title: title});
	
	Сategories.save(function(err){
		if(err) return console.log;
		response.send("Отзыв добавлен!");

	});
}

exports.getcategories = function(request, response){
	if(!request.body) return response.sendStatus(400);
	categoriesModel.find({}, function(err, categories){
		response.send(categories);
	});
}

exports.getcategory = function(request, response){
	if(!request.body) return response.sendStatus(400);
	categoriesModel.findOne({_id: request.query.id}, function(err, category){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(category);
	});
}

exports.editcategory = function(request, response){
	if(!request.body) return response.sendStatus(400);	
	const id = request.body.id;
	const title = request.body.title;

	categoriesModel.update({_id: id}, {$set: { title: title } }, {strict: false, new: true}, function(err){
		if(err) return console.log;
		response.send("Категория изменена!");
	})

}

exports.deletecategory = function(request, response){
	if(!request.body) return response.sendStatus(400);	
	const id = request.query.id;

	categoriesModel.deleteOne({_id: id}, function(err){
		if(err) return console.log;
		response.send("Категория удалена!");
	})

}

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/*
pricesModel
*/
exports.postprice = function(request, response){
	if(!request.body) return response.sendStatus(400);
	const title = request.body.title;
	const price = request.body.price;
	const category = request.body.category;

	const Prices = new pricesModel({title: title, price: price, category: category});
	
	Prices.save(function(err, data){
		if(err) return console.log;
		response.send(data);
	});

	

}


exports.getprices = function(request, response){
	if(!request.body) return response.sendStatus(400);

	pricesModel.find({}, function(err, prices){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(prices);

	});
}

exports.getprice = function(request, response){
	if(!request.body) return response.sendStatus(400);

	const id = request.query.id;

	pricesModel.findOne({_id: id}, function(err, price){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send(price);

	});
}

exports.editprice = function(request, response){
	if(!request.body) return response.sendStatus(400);

	const title = request.body.title;
	const price = request.body.price;
	const id = request.body.id;

	console.log(title, price, id);

	pricesModel.update({_id: id}, {$set: { title: title, price: price } }, {strict: false, new: true}, function(err, price){
		if (err){
			console.log(err);
			return response.sendStatus(400);
		}
		response.send("ok");

	});
}

exports.deleteprice = function(request, response){
	if(!request.body) return response.sendStatus(400);	
	const id = request.body.id;

	pricesModel.deleteOne({_id: id}, function(err){
		if(err) return console.log;
		response.send("Категория удалена!");
	})

}

exports.mailer = function(request, response){
	if(!request.body) return response.sendStatus(400);
	
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: "testphp14@gmail.com",
	    pass: "Metalgearsolid4"
	  }
	});


	var mailOptions = {
	  from: 'bozhenabigun@gmail.com',
	  to: 'testphp14@gmail.com',
	  subject: 'Немецкий сервис',
	  text:  'Номер клиента: ' + request.body.phone
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    response.send("Письмо успшно отправленно!");
	  }
	});

}