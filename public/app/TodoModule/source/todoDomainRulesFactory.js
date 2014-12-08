angular.module('todomvc')
    .factory('TodoDomainRulesFactory', function () {
        'use strict';

        // Add ... to every new todo
        function changeTodo( title ){
            return title + '...';
        }

        return {
            changeTodo: changeTodo
        }

    });

