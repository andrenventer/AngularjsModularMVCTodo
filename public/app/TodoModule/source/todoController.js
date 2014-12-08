angular.module('todomvc')
    .controller('TodoController', function TodoController($scope, $routeParams, $filter, TodoCollection) {
        'use strict';

        /**
         * Initialize controler variables
         */
        $scope.todos = TodoCollection.todos;
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
            $scope.remainingCount = $filter('filter')(TodoCollection.todos, { completed: false }).length;
            $scope.completedCount = TodoCollection.todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
//            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
//                TodoCollection.addTodo(TodoCollection.todos);
//            }
        }, true);

        /**
         * Revert the last edited Todo
         */
        $scope.revertEditing = function (todo) {
            TodoCollection.todos[TodoCollection.todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

        /**
         * Mark all the Todo's as completed
         *
         * @param completed
         */
        $scope.markAll = function (completed) {
            TodoCollection.todos.forEach(function (todo) {
                todo.completed = !completed;
                TodoCollection.updateTodo( todo );

                console.log(todo);

            });
        };

        /**
         * Remove a Todo
         *
         * @param todo
         */
        $scope.removeTodo = function (todo) {
            TodoCollection.deleteTodo(todo);
        };

        /**
         * Add a Todo
         */
        $scope.addTodo = function () {
            TodoCollection.addTodo( $scope.newTodo );
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
            TodoCollection.updateTodo( todo );
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

            TodoCollection.updateTodo( todo );
        };

        /**
         * Clear the list of all completed Todo's
         */
        $scope.clearCompletedTodos = function () {
            $scope.todos = TodoCollection.clearCompletedTodos();
        };

    });