(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('MenuItemsController', MenuItemsController);


  MenuItemsController.$inject = ['categoryData'];
  function MenuItemsController(categoryData) {
    var menuItems = this;
    console.log('Initializing MenuItemsController, categoryData:', categoryData);
    menuItems.items = categoryData.menu_items;
    menuItems.category = categoryData.category;
  }

})();
