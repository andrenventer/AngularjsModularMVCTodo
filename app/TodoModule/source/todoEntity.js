angular.module('todomvc')
    .factory('todoEntity', function (todoStorage) {
        'use strict';

        return{
            save: function save(todos) {
                todoStorage.put(todos);
            },
            load: function load() {
                return todoStorage.get();
            }
        }

    });
