(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['dataservice', '$filter', '$q'];

	function MainController(dataservice, $filter, $q) {
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

		//Activate Pokedex
		function activate() {
			return getPokedex().then(function(data) {
				console.log(vm.pokedex);
				return data;
			});
		}

		//Use factory to retreive Pokedex data from API
		function getPokedex() {
			return dataservice.getPokemon('http://pokeapi.co/api/v2/pokedex/1/')
				.then(function(data) {
					vm.pokedex.push.apply(vm.pokedex, data.pokemon_entries);
					return vm.pokedex;
				});
		}

		//Use factory to retrieve chosen Pokemon from API
		function getPokemon(url) {
			return dataservice.getPokemon(url)
				.then(function(data) {
					vm.pokemon = data;
					vm.loading = false; //Finished loading data
					vm.showCard = true; //Show Pokemon card
					console.log(vm.pokemon);
				});
		}

		function querySearch(query) {
			//Filter query only if Pokedex is loaded,
			//otherwise, activate it
			var results = vm.pokedex.length > 0
				? filterPokemon(query)
				: activate(), deferred;
			
			//Defer promise to show feedback on autocomplete
			deferred = $q.defer();
			deferred.resolve(results);
			return deferred.promise;

		}

		//Log out changes in query
		function searchTextChange(text) {
			console.log('Text changed to ' + text);
		}

		//Load Pokemon once chosen
		function selectedItemChange(item) {
			if(item) {
				getPokemon('http://pokeapi.co/api/v2/pokemon/' + item.entry_number);
				vm.loading = true; //Retrieving relevant Pokemon data
				console.log('Item changed to ' + item.pokemon_species.name);
			} else {
				vm.showCard = false; //Hide card when choosing new Pokemon
				console.log('Item changed to ' + item)
			}

		}

		//Return filtered Pokedex array with query
		function filterPokemon(query) {
			return query ? $filter('filter')(vm.pokedex, query) : vm.pokedex;
		}
	}

})();