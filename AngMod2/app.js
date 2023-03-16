(function () {
'use strict';

angular.module('ShoppingListCheck', [])
.service('ShoppingListCheckService', ShoppingListCheckService)
.controller('AlreadyBoughtCtrlr', AlreadyBoughtCtrlr)
.controller('ToBuyCtrlr', ToBuyCtrlr);

AlreadyBoughtCtrlr.$inject = ['ShoppingListCheckService'];
function AlreadyBoughtCtrlr(ShoppingListCheckService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckService.getBoughtItems();
}

ToBuyCtrlr.$inject = ['ShoppingListCheckService'];
function ToBuyCtrlr(ShoppingListCheckService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckService.getItemsToBuy()

  toBuyList.buyItem = function (index) {
    ShoppingListCheckService.buyItem(index);
  }
}

function ShoppingListCheckService() {
  var service = this;
  var boughtItems = [];

  var itemsToBuy = [
    { name: "Bags of Potato Chips", quantity: 13},
    { name: "Bottles of Soy Sauce", quantity: 7},
    { name: "Boxes of Crackers", quantity: 5},
    { name: "Oranges", quantity: 21},
    { name: "Hot Dogs", quantity: 11}
  ];

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.buyItem = function (index) {
    var item = itemsToBuy[index];
    boughtItems.push(item);
    itemsToBuy.splice(index, 1);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}
})();
