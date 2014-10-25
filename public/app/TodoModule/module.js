/**
 * The TodoMVC module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider.when('/todo', {
            controller: 'TodoCtrl',
            templateUrl: './app/TodoModule/source/todo-index.html'
        }).when('/todo/:status', {
            controller: 'TodoCtrl',
            templateUrl: './app/TodoModule/source/todo-index.html'
        }).otherwise({
            redirectTo: '/todo'
        });
    });
