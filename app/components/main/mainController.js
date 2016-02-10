(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['dataservice'];

	function MainController(dataservice) {
		var vm = this;

		vm.searchTextChange = searchTextChange;
		vm.selectedItemChange = selectedItemChange;

		vm.searchText = '';
		vm.selectedItem = '';
		vm.pokemon = [];

		activate();

		function activate() {
			return getPokemon().then(function() {
				console.log(vm.pokemon);
			});
		}

		function getPokemon() {
			return dataservice.getPokemon()
				.then(function(data) {
					vm.pokemon.push.apply(vm.pokemon, data);
					return vm.pokemon;
				});
		}

		function searchTextChange(text) {
			console.log('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			console.log('Item changed to ' + item.name);
		}
	}

})();