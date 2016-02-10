(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['dataservice', '$filter'];

	function MainController(dataservice, $filter) {
		var vm = this;

		//Functions of the VM
		vm.querySearch = querySearch;
		vm.searchTextChange = searchTextChange;
		vm.selectedItemChange = selectedItemChange;

		vm.searchText = '';
		vm.selectedItem = '';
		vm.pokedex = [];

		activate();

		function activate() {
			return getPokemon().then(function() {
				console.log(vm.pokedex);
			});
		}

		function getPokemon() {
			return dataservice.getPokemon()
				.then(function(data) {
					vm.pokedex.push.apply(vm.pokedex, sortPokemon(data));
					return vm.pokedex;
				});
		}

		function sortPokemon(data) {
			return $filter('orderBy')(data, 'name');
		}

		function querySearch(query) {
			return query ? $filter('filter')(vm.pokedex, query) : vm.pokedex;
		}

		function searchTextChange(text) {
			console.log('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			console.log('Item changed to ' + (item ? item.name + 'url: ' + item.resource_uri : item) );
		}
	}

})();