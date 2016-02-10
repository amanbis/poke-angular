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

		function getPokemon() {
			return $http.get('http://pokeapi.co/api/v1/pokedex/1/')
				.then(successCallback)
				.catch(errorCallback);
		}

		function successCallback(response) {
			return response.data.pokemon;
		}

		function errorCallback(error) {
			console.log('XHR Failed for getPokemon. ' + error.data);
		}
	}

})();