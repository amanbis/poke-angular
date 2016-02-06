(function() {
	'use strict';

	angular
		.module('app')
		.config(function($httpProvider){
		    delete $httpProvider.defaults.headers.common['X-Requested-With'];
		});

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$http'];

	function MainController($http) {
		var vm = this;

		vm.hello = 'hello';

		$http.get('http://pokeapi.co/api/v1/pokemon/1/')
			.then(successCallback, errorCallback);

		function successCallback(response) {
			console.log(response.data);
		}

		function errorCallback(response) {
			console.log(response);
		}
	}

})();