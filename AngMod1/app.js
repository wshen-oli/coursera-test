(function () {

'use strict';
angular.module('LunchCheck',[])
.controller('MsgController',MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope){
	$scope.result = "";
	$scope.input = "";
	$scope.checkLunch = function(){
		if ($scope.input == "") {
				$scope.result = "Please enter item name.";
		}
		else
		{
			var length = (($scope.input).split(",")).length;
			if(length > 0 && length < 4)
			{
				$scope.result = "Enjoy!";
			}
			else
			{
				$scope.result = "Too Much";
			}
		}
	};
}
})();
