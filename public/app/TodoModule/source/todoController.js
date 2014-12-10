angular.module('todomvc')
    .controller('TodoController', function TodoController($scope, $routeParams, $filter, TodoModelFactory) {
        'use strict';

        /**
         * Initialize controller variables
         */
        $scope.todos = TodoModelFactory.getAllTodos();
        $scope.newTodo = '';
        $scope.editedTodo = null;

        /**
         * Update active/completed counts on any todo change
         */
        $scope.$watch('todos', function (newValue, oldValue) {
            $scope.remainingCount = TodoModelFactory.calculateRemainingTodos();
            $scope.completedCount = TodoModelFactory.calculateCompletedTodos();
            $scope.allChecked = TodoModelFactory.getAllChecked();
        }, true);

        /**
         * Mark all the Todo's as completed
         *
         * @param completed
         */
        $scope.markAll = function( completed) {
            TodoModelFactory.markAll( completed );
        }

        /**
         * Remove a Todo
         *
         * @param todo
         */
        $scope.removeTodo = function (todo) {
            $scope.todos = TodoModelFactory.deleteTodo(todo);
        };

        /**
         * Add a Todo
         */
        $scope.addTodo = function () {
            $scope.todos = TodoModelFactory.addTodo( $scope.newTodo );
            $scope.newTodo = '';
        };

        /**
         * Edit a todo
         *
         * @param todo
         */
        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        /**
         * Toggle a Todo's status
         *
         * @param todo
         */
        $scope.toggleTodoStatus = function (todo) {
            todo.completed = !todo.completed;
            TodoModelFactory.updateTodo( todo );
        };

        /**
         * Update the Todo after editing its value
         *
         * @param todo
         */
        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }

            TodoModelFactory.updateTodo( todo );
        };

        /**
         * Clear the list of all completed Todo's
         */
        $scope.clearCompletedTodos = function () {
            $scope.todos = TodoModelFactory.clearCompletedTodos();
        };

        /**
         * Show all todos
         */
        $scope.showAllTodos = function() {
            $scope.todos = TodoModelFactory.getAllTodos();
        };

        /**
         * Show active todos
         */
        $scope.showActiveTodos = function() {
            $scope.todos = TodoModelFactory.getActiveTodos();
        };

        /**
         * Show completed todos
         */
        $scope.showCompletedTodos = function() {
            $scope.todos = TodoModelFactory.getCompletedTodos();
        };

    });