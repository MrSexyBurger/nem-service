const express = require("express");
const repairController = require("../controllers/repairController.js"); // подключили контроллер
const repairRouter = express.Router(); // определяем роутер

// определяем маршруты и их обработчики внутри роутера homeRouter
repairRouter.get("/fridge", repairController.fridge);
repairRouter.get("/washing", repairController.washing);
repairRouter.get("/dishwasher", repairController.dishwasher);
repairRouter.get("/electric_stove", repairController.electric_stove);
repairRouter.get("/oven", repairController.oven);
repairRouter.get("/hob", repairController.hob);


// всё для repare
repairRouter.post("/postprice", repairController.postprice);
repairRouter.get("/getprices", repairController.getprices);
repairRouter.get("/getprice", repairController.getprice);
repairRouter.post("/deleteprice", repairController.deleteprice);
repairRouter.post("/editprice", repairController.editprice);

// всё для gears

repairRouter.post("/postcause", repairController.postcause);
repairRouter.get("/getcauses", repairController.getcauses);
repairRouter.get("/getcause", repairController.getcause);
repairRouter.post("/deletecause", repairController.deletecause);
repairRouter.post("/editcause", repairController.editcause);


module.exports = repairRouter;