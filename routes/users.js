var mongoose = require('mongoose');
var Users = require('../models/userSchema.js');

var users = {

  getAll: function(req, res) {
   Users.find({}, function (err, users){
	   console.log(users);
	   res.json(
		   {"success": true,
		    "result" : users});
	   
	   
   })
  
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    res.json(user);
  },

  create: function(req, res) {
	  // Find User in database.
	Users.findOne({ username: req.body.username }, function(err, user) {
        if (err) { return (err) };
        if (user) {
			res.status(202)
            return res.json({success: false, message: 'User already exists.'});
        } else {
			
			//Match this with User Schema
			newUserProfile = {
				username: req.body.username,
				password: req.body.password
			}
			
            Users.create(newUserProfile, function (err, newUser) {
                if (err) { return err };
				console.log(newUser)
				var user = {}
				user.username = newUser.username;
				user.role = newUser.role;
				user._id = newUser._id
				res.status(201)
                return res.json({success: true, message: 'User created.', payload: user});
				
            });
        };
    });
  },

  update: function(req, res) {
	  Users.update(query, { $set: { name: 'jason borne' }}, options, callback)
	
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

module.exports = users;
