angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoEntity) {
        'use strict';

        var todos = $scope.todos = todoEntity.load();
        $scope.newTodo = '';

        // Monitor the current route for changes and adjust the filter accordingly.

        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        // live edit and undo features

        $scope.editedTodo = null;

        $scope.$watch('todos', function (newValue, oldValue) {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoEntity.save(todos);
            }
        }, true);

        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }
        };

        // undo features could also be in the DDD entity

        $scope.revertEditing = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

        // prime candidates for DDD entity

        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                todo.completed = !completed;
            });
        };

        $scope.removeTodo = function (todo) {
            todos.splice(todos.indexOf(todo), 1);
        };

        $scope.addTodo = function () {
            var newTodo = $scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }

            todos.push({
                title: newTodo,
                completed: false
            });

            $scope.newTodo = '';
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.clearCompletedTodos = function () {
            $scope.todos = todos = todos.filter(function (val) {
                return !val.completed;
            });
        };

    });