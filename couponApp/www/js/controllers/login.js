angular.module('starter.controllers')

.controller('CompteCtrl', function($scope, $state, $ionicModal, authService, userData, $window) {

  $scope.user;
  getUser();
  console.log(getCoupons());

  function getCoupons (){
    userData.getCoupons();
  }

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
      $state.go('tab.market', {}, {reload: true});
    }, function(res){
      alert(res.data);
    });
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
    $state.go('tab.accueil');
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
