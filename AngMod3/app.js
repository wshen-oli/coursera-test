(function () {
    'user strict';

    angular.module('NarrowDownApp', [])
    .controller('NarrowItDownCtrler', NarrowItDownCtrler)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective);

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json",
            }).then(function(result) {
                var foundItems = [];
                console.log(foundItems.length);
                var temp = result.data.menu_items;
                if (searchTerm != undefined && searchTerm != "") {
                    for(var i = 0; i < temp.length; i++) {
                        if (temp[i].description.indexOf(searchTerm.toLowerCase()) != -1) {
                            foundItems.push(temp[i]);
                        }
                    }
                }
                console.log(foundItems.length);
                return foundItems;
            }).catch(function (error) {
                console.log("can not find it");
            });
        };
    }

    function foundItemsDirective() {
        var ddo = {
            restrict: 'E',
		    templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&',
                isEmpty: '<'
            }
        };
        return ddo;
    }

    NarrowItDownCtrler.$inject = ['MenuSearchService'];
    function NarrowItDownCtrler(MenuSearchService) {
        var search = this;

        search.getMatchedMenuItems = function (searchTerm) {
            search.empty = searchTerm == ("" || undefined)? true : false;
            console.log(search.empty);
            if (!search.empty) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                search.found = [];
                console.log(search.found);
                promise.then(function (response) {
                    search.found = response;
                    console.log(search.found.length);
                    search.empty = search.found.length > 0 ? false : true;
                    console.log(search.empty);
                }).catch(function (error) {
                    console.log("error coming back");
                })
            }
        };

        search.removeItem = function(index) {
            return search.found.splice(index, 1);
        };
    }
})();
