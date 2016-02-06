(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$http'];

	function MainController($http) {
		var vm = this;

		vm.hello = 'hello';

		$http.get('http://www.cheapshark.com/api/1.0/deals?storeID=6&desc=0&title=civilization%20V&pageSize=2')
			.then(successCallback, errorCallback);

		function successCallback(response) {
			console.log(response.data);
		}

		function errorCallback(response) {
			console.log(response);
		}
	}

})();