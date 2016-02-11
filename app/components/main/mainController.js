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
		vm.pokemon = {};
		vm.showCard = false;
		vm.loading = false;

		activate();

		function activate() {
			return getPokedex().then(function() {
				console.log(vm.pokedex);
			});
		}

		function getPokedex() {
			return dataservice.getPokemon('http://pokeapi.co/api/v2/pokedex/1/')
				.then(function(data) {
					vm.pokedex.push.apply(vm.pokedex, data.pokemon_entries);
					return vm.pokedex;
				});
		}

		function getPokemon(url) {
			return dataservice.getPokemon(url)
				.then(function(data) {
					vm.pokemon = data;
					vm.loading = false;
					vm.showCard = true;
					console.log(vm.pokemon);
				});
		}

		function querySearch(query) {
			return query ? $filter('filter')(vm.pokedex, query) : vm.pokedex;
		}

		function searchTextChange(text) {
			console.log('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			if(item) {
				getPokemon('http://pokeapi.co/api/v2/pokemon/' + item.entry_number);
				vm.loading = true;
				console.log('Item changed to ' + item.pokemon_species.name);
			} else {
				vm.showCard = false;
				console.log('Item changed to ' + item)
			}

		}
	}

})();