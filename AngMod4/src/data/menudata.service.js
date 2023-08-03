(function () {
    'use strict';

    angular.module('Data')
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                console.log(response);
                return response.data;
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + `/menu_items/${categoryShortName}.json`)
            }).then(function (response) {
                console.log(response);
                return response.data;
            });
        };

    }

})();