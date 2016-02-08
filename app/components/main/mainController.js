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

		vm.searchTextChange = searchTextChange;
		vm.selectedItemChange = selectedItemChange;

		vm.searchText = '';
		vm.selectedItem = '';
		vm.pokemon = [
			'Bulbasaur',
			'Squirtle',
			'Charmander'
		];

		$http.get('http://pokeapi.co/api/v1/pokedex/1/')
			.then(successCallback, errorCallback);

		function successCallback(response) {
			console.log(response.data);
		}

		function errorCallback(response) {
			console.log(response);
		}

		function searchTextChange(text) {
			console.log('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			console.log('Item changed to ' + item);
		}
	}

})();