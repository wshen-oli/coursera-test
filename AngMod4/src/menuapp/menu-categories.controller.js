(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('MenuCategoriesController', MenuCategoriesController);


  MenuCategoriesController.$inject = ['categories'];
  function MenuCategoriesController(categories) {
    var menuCategories = this;
    console.log('Initializing MenuCategoriesController, categories:', categories);
    menuCategories.categories = categories;
  }

})();
