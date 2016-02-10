(function() {
	'use strict';

	angular
		.module('app')
		.factory('dataservice', dataservice);

	dataservice.$inject = ['$http'];

	function dataservice($http) {
		return {
			getPokemon: getPokemon
		};

		function getPokemon(url) {
			return $http.get(url)
				.then(successCallback)
				.catch(errorCallback);
		}

		function successCallback(response) {
			return response.data;
		}

		function errorCallback(error) {
			console.log('XHR Failed for getPokemon. ' + error.data);
		}
	}

})();