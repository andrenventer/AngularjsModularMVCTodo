angular.module('todomvc')
    .factory('todoEntity', function (todoStorage) {
        'use strict';

        return{
            save: function save(todos) {
                todoStorage.put(todos);
            },
            load: function load() {
                return todoStorage.get();
            },
	        markAll: function markAll(completed) {
		        var todos = todoStorage.get();
		        console.log('markall');
		        todos.forEach(function (todo) {
			        todo.completed = !completed;
		        });

		        todoStorage.put(todos);

		        return todoStorage.get();
	        }
        }

    });
