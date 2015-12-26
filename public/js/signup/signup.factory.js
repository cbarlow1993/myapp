
myApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    signUp: function(username, password) {
      return $http.post('http://localhost:3000/create', {
        username: username,
        password: password
      });
		
		$location.path("/login");
    }
  }
});

