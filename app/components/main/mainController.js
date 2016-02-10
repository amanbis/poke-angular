(function() {
	'use strict';

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
		vm.pokemon = [];

		$http.get('http://pokeapi.co/api/v1/pokedex/1/')
			.then(successCallback, errorCallback);

		function successCallback(response) {
			vm.pokemon.push.apply(vm.pokemon, response.data.pokemon);
			console.log(vm.pokemon);
		}

		function errorCallback(response) {
			console.log(response);
		}

		function searchTextChange(text) {
			console.log('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			console.log('Item changed to ' + item.name);
		}
	}

})();