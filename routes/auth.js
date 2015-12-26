var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var Users = require('../models/userSchema.js');

var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
	  
	  	Users.findOne({username: username}, function(err, user) {
		  if (err) { return err };
		  if (!user) {
			  return res.json({
							"status": 401,
							"message": "No user found"
			});
		  } else if (user) {
				user.comparePassword(password, function(err, isMatch) {
					if (err) { return (err) };
					if (isMatch === true) {
						res.status(200);
						
						console.log();
						
						res.json({success: true, message: genToken(user)});
						return; 
					};
					

					if (isMatch === false) {
						res.status(401);
						res.json({
							"status": 401,
							"message": "Invalid credentials"
						  });
						return;
					};
        		});
        	};
		});



  },

  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = '';// = { // spoofing a userobject from the DB. 
    //  name: 'arvind',
    //  role: 'admin',
    //  username: 'arvind@myapp.com'
    // };
	  

    return dbUserObj;
  },

  validateUser: function(username) {
	  Users.findOne({username: username}, function(err, user) {
		  if (err) { return err };
		  if (user) {
			  console.log('Validate user' + user)
			  return user;
		  }; 
  	});
  }
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
	user: {
		username: user.username,
		role: user.role
	}
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
