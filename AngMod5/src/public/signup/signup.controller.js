(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['UserService', 'MenuService'];
    function SignUpController(UserService, MenuService) {
      var signUpCtrl = this;
      signUpCtrl.user = UserService.getUser();
      signUpCtrl.dishShortName = "";
      signUpCtrl.registered = signUpCtrl.user != null;
      signUpCtrl.favoriteError = "";

      signUpCtrl.submit = function () {
        signUpCtrl.favoriteError = "";
        try {
            MenuService.getMenuItem(signUpCtrl.dishShortName).then(function (favoriteItem) {
                if (favoriteItem) {
                    signUpCtrl.user.favorite = favoriteItem;
                    UserService.register(signUpCtrl.user);
                    signUpCtrl.registered = true;
                } else {
                    treatItemError("Item not found");
                }
            }).catch(function (error) {
                treatItemError(error);
            });
        } catch (error) {
            treatItemError(error);
        }
      }

      function treatItemError(error) {
        console.log("treatItemError", error);
        signUpCtrl.favoriteError = error;
      }
    }
    
    })();
    