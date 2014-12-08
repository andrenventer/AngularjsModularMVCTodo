angular.module('todomvc')
    .controller('TodoController', function TodoController($scope, $routeParams, $filter, TodoModel) {
        'use strict';

        /**
         * Initialize controler variables
         */
        $scope.todos = TodoModel.todos;
        $scope.newTodo = '';
        $scope.editedTodo = null;

        /**
         * Change the view/route to display Todo's accoring to their status
         */
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        /**
         * Update active/completed counts on any todo change
         */
        $scope.$watch('todos', function (newValue, oldValue) {
            $scope.remainingCount = $filter('filter')(TodoModel.todos, { completed: false }).length;
            $scope.completedCount = TodoModel.todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;//
        }, true);

        /**
         * Revert the last edited Todo
         */
        $scope.revertEditing = function (todo) {
            TodoModel.todos[TodoModel.todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

        /**
         * Mark all the Todo's as completed
         *
         * @param completed
         */
        $scope.markAll = function( completed) {
            TodoModel.markAll( completed );
        }

        /**
         * Remove a Todo
         *
         * @param todo
         */
        $scope.removeTodo = function (todo) {
            TodoModel.deleteTodo(todo);
        };

        /**
         * Add a Todo
         */
        $scope.addTodo = function () {
            TodoModel.addTodo( $scope.newTodo );
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
            TodoModel.updateTodo( todo );
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

            TodoModel.updateTodo( todo );
        };

        /**
         * Clear the list of all completed Todo's
         */
        $scope.clearCompletedTodos = function () {
            $scope.todos = TodoModel.clearCompletedTodos();
        };

    });