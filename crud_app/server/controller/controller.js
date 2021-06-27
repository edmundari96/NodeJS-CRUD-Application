// this is requiring the model used in database crud operation
const { model } = require('mongoose');
const Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) =>{
    
    //this validation to prevent submission of empty post request
if(!req.body){
    res.status(400).send({message: "Content cannot be empty"});
    return;
}else{
    // create a new user by instantiating the user from the Userdb model in the model.js
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });
    
    //her we save a user detail in the database user document which is sent as the data
    user
    .save(user)
    .then(data => {
        // res.send(data)
        res.redirect('/add-user');
    })
    .catch(err => {
        //here we are trying to send an error code of 400(bad request response status code) if the request fails// we return a custom error message with the pipe character (||)
        res.status(400).send({
            message: err.message|| "some error occured while creating a create operation"
        });
    });
}

}

//retrieve and return all users////retrieve and return a single user
exports.find = (req, res) =>{
    
if(req.query.id){
    const id = req.query.id;
    Userdb.findById(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `No user is found with id ${id}`});
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message: `Error retrweiving user with id ${id}`});
    })

}else{
        Userdb.find()
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Error occured while retreiving user information",
            });
          });
}

}

//update a new identified user by user id
exports.update = (req, res) =>{
    //if there is no user details sent(body) respond with the custom error message
    if(!req.body){
        res.status(400).send({message:"Data to update connot be empty"})
        return;
    }else{
        //while trying to update a user search for and use the id from the url(.ie ...can be accessed from the request method "params")
        const id = req.params.id;
    
        Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: true})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Update user with ${id}. Maybe user not found`})
            }else{
                res.send(data)
            }
        })
         .catch(err => {
         res.status(500).send({message:"Error Update user information"})
    })
    }
    
}

//Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndUpdate(id)
    
    .then(data => {
        if(!data){
            res.status(404).send({message: `cannot delete user with id ${id}, maybe id is wrong`});
        }else{
            res.send({ message: "User was Deleted successfully!"});
        }
    })
    .catch( err => {
        res.status(500).send({ message: `could not delete user with id ${id}`});
    });
    
}