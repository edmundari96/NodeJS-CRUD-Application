// this is requiring the already installed express dependency in this application for use
const express = require("express");

// this is requiring the already installed dotenv dependency in this application for use //the main use is to seperate the delicatre environmental variable of the application from the main code
const dotenv = require("dotenv");

// this is requiring the already installed morgan dependency in this application for use //the main use is to log http requests // its a nodejs middleware
const morgan = require("morgan");

// this is requiring the already installed body-parser dependency in this application for use //the main use is to break request body into chunks including the definition of each part before (inside a middleware) before it gets to the handlers
const bodyParser = require("body-parser");

// the path module is a nodejs inbuilt module use for establishing path to files or folders
const path = require("path");

//this is requiring the db connection
const connectDB = require('./server/database/connection');

// this is calling/invoking the express dependency and assigning it to a constant app so as to use all its properties and method declared inside it
const app = express();

//this is invoking the dotenv function and linking this file to the path where the .env file is located. the path does not have any ./ or ../(relative path) because the .env file is located in the root directory (crud_app)
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;

//this is used to pars
app.use(bodyParser.urlencoded({ extended: true }));

// this is setting what you are going to use as the template engine for your app....it can be ejs, pug or html
app.set("view engine", "ejs");

// this sets the path to the folder where you get the view fot the project
app.set("/views", path.resolve(path.join(__dirname, "views/ejs")));

//this is where we load the static assets of the stylsheet(css)
app.use("/css", express.static(path.join(__dirname, "assets/css")));

//this is where we load the static assets of images(img)
app.use("/img", express.static(path.join(__dirname, "assets/img")));

//this is where we load the static assets of javascript(js)
app.use("/js", express.static(path.join(__dirname, "assets/js")));

//this is the loging of a http request with short request url(morgan customized) on the app.use() general mount
app.use(morgan("tiny"));

//invoking the database connection function
connectDB();

//here the route file is required
app.use('/', require('./server/routes/router'));


// this is the port number where the http request is routed through which is 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
