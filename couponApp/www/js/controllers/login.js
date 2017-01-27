angular.module('starter.controllers')

.controller('CompteCtrl', function($scope, $ionicModal, authService, userData, $window, $state) {

  $scope.user;
  getUser();
  //addCoupon();
  console.log("user : ")
  console.log($scope.user);
  console.log("userData : ")
  console.log(userData);

  function addCoupon2() {
    coupon = {
      shopName : "test",
      value : "25%",
      role : "gerant",
      expireAt : "2018-10-21T13:28:06.419Z",
      count : 5,
    };
    console.log(coupon);
    userData.addCoupon(coupon);
  }

  $scope.addCoupon = function() {
    console.log($scope.coupon);
    $scope.coupon.role = "gerant";
    userData.addCoupon($scope.coupon);
    $window.location.reload(true);
  }

  /* A Move */
  function getUser() {
    userData.getUser()
      .success(function (user) {
        $scope.user = user;
        console.log($scope.user);
      })
      .error(function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
      });
  }
  $scope.verifLogin = function() {
    console.log($scope.loginData);
    authService.login($scope.loginData, function(res){
    }, function(res){
      alert(res.data);
    });
    console.log($state.current);
    $state.go('tab.accueil', {}, {reload: true});
  }

  $scope.deco = function() {
    console.log("deconnexion...");
    authService.logout();
    $window.location.reload(true);
  }

  $scope.supprimerCompte = function() {
    console.log("Suppression...");
    userData.removeUser($scope.user._id);
    $window.location.reload(true);
  }

  $scope.supprimerCoupon = function() {
    console.log("Supp coupon...");
    
  }

  $scope.redirectCoupon = function($id){
    window.location = '/coupons/' + $id;
  };

  $ionicModal.fromTemplateUrl('templates/inscription.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.inscription = modal;
  });

});
