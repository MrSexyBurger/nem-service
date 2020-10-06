const express = require("express");
const homeController = require("../controllers/homeController.js"); // подключили контроллер
const homeRouter = express.Router(); // определяем роутер
const bodyParser = require("body-parser"); // для обмена данными

// определяем маршруты и их обработчики внутри роутера homeRouter
homeRouter.get("/about", homeController.about);
homeRouter.get("/contacts", homeController.contacts);
homeRouter.get("/review", homeController.review);
homeRouter.get("/prices", homeController.prices);

//всё связанное с review
homeRouter.get("/getreviews", homeController.getreviews);
homeRouter.post("/postreview", homeController.postreview);
homeRouter.get("/review/delete", homeController.deletereview);
homeRouter.post("/editreview", homeController.editreview);
homeRouter.get("/getreview", homeController.getreview);

//всё связанное с категориями
homeRouter.post("/postcategory", homeController.postcategory);
homeRouter.get("/getcategories", homeController.getcategories);
homeRouter.get("/getcategory", homeController.getcategory);
homeRouter.post("/editcategory", homeController.editcategory);
homeRouter.get("/deletecategory", homeController.deletecategory);

//всё связанное с ценами

homeRouter.post("/postprice", homeController.postprice);
homeRouter.get("/getprices", homeController.getprices);
homeRouter.get("/getprice", homeController.getprice);
homeRouter.post("/editprice", homeController.editprice);
homeRouter.post("/deleteprice", homeController.deleteprice);




homeRouter.post("/mailer", homeController.mailer); // отправка почты


homeRouter.get("/", homeController.index);

module.exports = homeRouter;