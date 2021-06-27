// this is requiring the mongoose dependency which is a mongodb object modelling tool designed to work in an asynchronous environments. Mongoose supports both promises and callback
const mongoose = require("mongoose");

// the schema is the data shaper(defines who goes to where) that maps data to a mongodb collection and defines the shap of the collection within that collection
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String
});

const Userdb = mongoose.model('userdb', schema);
module.exports = Userdb;