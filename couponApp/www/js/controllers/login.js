angular.module('starter.controllers')

.controller('CompteCtrl', function($scope, $state, $ionicModal, authService, userData) {

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
      $state.go('tab.market');
    }, function(res){
      alert(res.data);
    });
  }

  $scope.deco = function() {
    authService.logout();
    $state.go('tab.accueil');
  }

  $ionicModal.fromTemplateUrl('templates/inscription.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.inscription = modal;
  });

});
