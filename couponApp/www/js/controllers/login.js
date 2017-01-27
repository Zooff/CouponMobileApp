angular.module('starter.controllers')

.controller('CompteCtrl', function($scope, $state, $ionicModal, authService, userData, $window, $ionicPopup) {

  $scope.user;
  getUser();
  getCoupons();

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
    $state.go('tab.compte', {}, {reload: true});
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

  function getCoupons() {
    userData.getCoupons()
      .success(function (coupons) {
        $scope.coupons = coupons;
        console.log($scope.coupons);
      })
      .error(function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
      });
  }

  $scope.verifLogin = function() {
    console.log($scope.loginData);
    authService.login($scope.loginData, function(res){
      console.log("testtt");
      $state.go('tab.compte', {}, {reload: true});
      //$state.transitionTo('tab.market', null, {reload: true, notify:true});
    }, function(res){
      alert(res.data);
    });
  }

  $scope.deco = function() {
    console.log("deconnexion...");
    authService.logout();
    $state.go('tab.compte', {}, {reload: true});
  }

  $scope.supprimerCompte = function() {
    console.log("Suppression...");
    userData.removeUser($scope.user._id);
    $window.location.reload(true);
    $state.go('tab.accueil', {}, {reload: true});
  }

  $scope.supprimerCoupon = function() {
    console.log("Supp coupon...");
    
  }

  $scope.confirmTrade = function() {
    console.log("popupppp");
    var confirmPopup = $ionicPopup.confirm({
      title: 'Echanger ce coupon ?',
      template: 'Etes-vous sûr de vouloir placer ce coupon sur la liste des coupons à échanger ?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('Ajout dans la liste');
      } else {
        console.log('Ne fais rien');
      }
    });
  };

  $ionicModal.fromTemplateUrl('templates/inscription.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.inscription = modal;
  });

});
