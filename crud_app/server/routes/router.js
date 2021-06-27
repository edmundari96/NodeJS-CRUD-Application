// this is requiring the already installed express dependency in this application for use
const express = require("express");

// here a route method of express is used here// it main funtionality is to help you to create routes(http requests) from other pages
const route = express.Router();

//outsourcing the callback functions of the routes to the render.js file in the services fold
const services = require('../services/render'); 

// requiring the controller for managing the model operations
const controller = require('../controller/controller'); 

//this is an express http GET request(req) to to the home page// when a request comes to this http url send "hello world"// the callback function is located in the render.js(homeRoutes)
route.get("/", services.homeRoutes);

//this is an express http GET request(req) to to the add_user.ejs file// where a user is added to the db // the callback function is located in the render.js(add_user)
route.get("/add-user", services.add_user);

/** 
@description this is an express http GET request(req) to to the update_user.ejs file// where a user profile is update to the db // the callback function is located in the render.js(update_user)
*/
route.get("/update-user", services.update_user);

//this is an api post request to submit a user profile details into the myFirstDatabase collection // the operation is called on controller.create callback function in the controller.js
route.post("/api/myFirstDatabase", controller.create);

//this is an api get request to a user profile details or all the user datails in the myFirstDatabase collection // the operation is called on controller.find callback function in the controller.js
route.get("/api/myFirstDatabase", controller.find);

//this is an api put request(update) to update user datails (with a specific id) in the myFirstDatabase collection // the operation is called on controller.update callback function in the controller.js
route.patch("/api/myFirstDatabase:id", controller.update);

//this is an api delete request to delete a user profile details from the myFirstDatabase collection // the operation is called on controller.delete callback function in the controller.js
route.delete("/api/myFirstDatabase:id", controller.delete);

module.exports = route;