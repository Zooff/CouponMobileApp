angular.module('starter.services',  [])

.factory('authService', function($q,$http, $window, ApiEndpoint){
  var isAuth = false;
  var authToken = undefined;

  function loadUserCredentials(){
    var token = window.localStorage.getItem('token');
    console.log(token);
    if (token){
      useCredentials(token);
    }
  }

  function setCredentials(token){
    window.localStorage.setItem('token', token);
    useCredentials(token);
  }

  function useCredentials(token){
    isAuth = true;
    authToken = token;

    $http.defaults.headers.common['x-access-token'] = authToken;
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyCredentials(){
    isAuth = false;
    authToken = undefined;
    $http.defaults.headers.common['x-access-token'] = undefined;
    $http.defaults.headers.common.Authorization = undefined;

    var token = $window.localStorage.removeItem('token');
  }

  var login = function (user, resolve, reject){

    $http.post(ApiEndpoint.url + "authenticate", user).then(function(result){
      if (result.data.success){
        setCredentials(result.data.message);
        resolve(result.data.message);
      }
      else {
        reject(result.data.message);
      }
    });
  };

  var signup = function (user){
    return $q(function(resolve, reject){
      $http.post(ApiEndpoint.url + "signup", user).then(function(result){
        if (result.status == 200){
          resolve(result);
        }
        else {
          reject(result);
        }
      });
    });
  }

  var logout = function () {
    destroyCredentials();
  }

  loadUserCredentials();

  return {
    login : login,
    signup : signup,
    logout : logout,
    isAuthenticated : function(){return isAuth;},
  };

})

.factory('AuthInterceptor', function($rootScope, $q){
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: 'Not Authenticate',
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})
