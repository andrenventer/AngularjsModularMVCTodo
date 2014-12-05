angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoModel) {
        'use strict';

        /**
         * Initialize controler variables
         */
        $scope.todos = todoModel.todos;
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
            $scope.remainingCount = $filter('filter')(todoModel.todos, { completed: false }).length;
            $scope.completedCount = todoModel.todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
//            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
//                todoModel.addTodo(todoModel.todos);
//            }
        }, true);

        /**
         * Revert the last edited Todo
         */
        $scope.revertEditing = function (todo) {
            todoModel.todos[todoModel.todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

        /**
         * Mark all the Todo's as completed
         *
         * @param completed
         */
        $scope.markAll = function (completed) {
            todoModel.todos.forEach(function (todo) {
                todo.completed = !completed;
                todoModel.updateTodo( todo );
            });
        };

        /**
         * Remove a Todo
         *
         * @param todo
         */
        $scope.removeTodo = function (todo) {
            todoModel.deleteTodo(todo);
        };

        /**
         * Add a Todo
         */
        $scope.addTodo = function () {
            todoModel.addTodo( $scope.newTodo );
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
            todoModel.updateTodo( todo );
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

            todoModel.updateTodo( todo );
        };

        /**
         * Clear the list of all completed Todo's
         */
        $scope.clearCompletedTodos = function () {
            $scope.todos = todoModel.clearCompletedTodos();
        };

    });