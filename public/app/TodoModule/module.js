/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {
            controller: 'TodoCtrl',
            templateUrl: 'app/TodoModule/source/todo-index.html'
        }).when('/:status', {
            controller: 'TodoCtrl',
            templateUrl: 'app/TodoModule/source/todo-index.html'
        }).otherwise({
            redirectTo: '/'
        });
    });