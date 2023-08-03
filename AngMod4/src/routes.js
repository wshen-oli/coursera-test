(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Menu index (categories)
  .state('menu', {
    url: '/menu',
    templateUrl: 'src/menuapp/templates/menu-categories.template.html',
    controller: 'MenuCategoriesController as menuCategories',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Category items
  .state('items', {
    url: '/{short_name}',
    templateUrl: 'src/menuapp/templates/menu-category-items.template.html',
    controller: 'MenuItemsController as menuItems',
    params: {
      short_name: null
    },
    resolve: {
      categoryData: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.short_name);
      }]
    }
  });

}

})();
