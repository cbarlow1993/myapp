var jwt = require('jwt-simple');
var Users = require('../models/userSchema.js');

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
  
  // Get token from body, query or headers. Headers preferred.
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (token) {
    try {
		// Decode token.
      var decoded = jwt.decode(token, require('../config/secret.js')());
		// Check if token has expired. 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
		  "success": false,
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
		
		console.log()
	  
	// Validate user. 	
	Users.findOne(decoded.user.username, function(err, user) {
		 if (err) { return err };
		 if (user) {
			 console.log('Here')
			  req.user = user
			  if ((req.url.indexOf('admin') >= 0 && decoded.user.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
				  console.log(decoded.user.role)
				  req.user = decoded.user.username
				  next(); // To move to next middleware
				} else {
				  res.status(403);
				  res.json({
					"success": false,
					"status": 403,
					"message": "Not Authorized"
				 });
        	}
			  
			   
		  } else {
		  console.log('Invalied user' +dbUser)
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
		  "success": false,
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }
  	});
		

      } 

     catch (err) {
	  console.log(err);
      res.status(500);
      res.json({
		"success": false, 
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
	  "success": false,
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};
