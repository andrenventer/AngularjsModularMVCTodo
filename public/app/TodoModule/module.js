/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider.when('/', {
            controller: 'TodoController',
            templateUrl: 'app/TodoModule/source/todo-index.html'
        }).when('/:status', {
            controller: 'TodoController',
            templateUrl: 'app/TodoModule/source/todo-index.html'
        }).otherwise({
            redirectTo: '/'
        });
    });