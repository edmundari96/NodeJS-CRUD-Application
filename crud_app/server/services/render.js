const { default: axios } = require("axios");
const { query } = require("express");

// axios is a promise based for performing http operations for browsers and nodejs




// this serves as the response of the http request asking for the index page, it sits in a callback function used in route.js, this function is also exported to wherever it is used
exports.homeRoutes = (req, res) => {
  //make a get request to api/myFirstDatbase
  axios
    .get("http://localhost:3000/api/myFirstDatabase")
    .then(function (response) {
      // console.log(response.data);
      res.render("index", { users: response.data });
    })
    .catch(function (error) {
      res.send(error);
    });
}

// this serves as the response of the http request asking for the add_user page, it sits in a callback function used in route.js, this function is also exported to wherever it is used
exports.add_user = (req, res) => {
  res.render("add_user");
}

// this serves as the response of the http request asking for the update_user page, it sits in a callback function used in route.js, this function is also exported to wherever it is used
exports.update_user = (req, res) => {
  // res.render("update_user");
  axios.get('http://localhost:3000/api/myFirstDatabase',{ params:{id:req.query.id}})
  .then(function(userdata){
    res.render("update_user",{user:userdata.data})
  })
  .catch(err =>{
    res.send(err)
  })
};