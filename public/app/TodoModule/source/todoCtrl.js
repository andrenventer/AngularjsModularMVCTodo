angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoModel) {
        'use strict';

        $scope.newTodo = '';
        $scope.editedTodo = null;

        // Load Todos once model loaded them
        $scope.$on('todoModel::loadAllTodos', function() {
            $scope.todos = todoModel.todos;
        });

        // Monitor the current route for changes and adjust the filter accordingly.
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        // Live edit and undo features
        $scope.$watch('todos', function (newValue, oldValue) {
            $scope.remainingCount = $filter('filter')(todoModel.todos, { completed: false }).length;
            $scope.completedCount = todoModel.todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoModel.save( todoModel.todos );
            }
        }, true);

        // Done editing
        $scope.doneEditing = function ( todo ) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if ( !todo.title ) {
                $scope.removeTodo( todo );
            }
        };

        // Undo features could also be in the DDD entity
        $scope.revertEditing = function ( todo ) {
            todoModel.todos[ todoModel.todos.indexOf( todo ) ] = $scope.originalTodo;
            $scope.doneEditing( $scope.originalTodo );
        };

        // Mark all Todos
        $scope.markAll = todoModel.markAll( $scope.allChecked );

        // Remove Todo
        $scope.removeTodo = todoModel.removeTodo( $scope.todo );

        // Add Todo
        $scope.addTodo = todoModel.addTodo( $scope.newTodo );

        // Edit Todo
        $scope.editTodo = function ( todo ) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        // Clear completed Todos
        $scope.clearCompletedTodos = function () {
            todoModel.todos = todoModel.clearCompletedTodos();
        };

    });