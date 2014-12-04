angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoModel) {
        'use strict';

        $scope.todos = todoModel.todos;
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
            $scope.remainingCount = $filter('filter')(todoModel.todos, { completed: false }).length;
            $scope.completedCount = todoModel.todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
//            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
//                todoModel.addTodo(todoModel.todos);
//            }
        }, true);

        // undo features could also be in the DDD entity

        $scope.revertEditing = function (todo) {
            todoModel.todos[todoModel.todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

        // prime candidates for DDD entity

        $scope.markAll = function (completed) {
            todoModel.todos.forEach(function (todo) {
                todo.completed = !completed;
            });
        };

        $scope.removeTodo = function (todo) {
            todoModel.deleteTodo(todo);
        };

        $scope.addTodo = function () {
            todoModel.addTodo( $scope.newTodo );
            $scope.newTodo = '';
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.toggleTodoStatus = function (todo) {
            todo.completed = !todo.completed;
            todoModel.updateTodo( todo );
        };

        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }

            todoModel.updateTodo( todo );
        };

        $scope.clearCompletedTodos = function () {
            $scope.todos = todoModel.clearCompletedTodos();
        };

    });