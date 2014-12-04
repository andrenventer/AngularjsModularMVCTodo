angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoEntity, todoREST, todoModel) {
        'use strict';

        $scope.todos = todoModel.loadTodos();

        $scope.newTodo = '';

        $scope.addTodo = function() {
            $scope.todos = todoModel.addTodos( $scope.newTodo );
            $scope.newTodo = '';
        };

        $scope.removeTodo = function ( todo ) {
            $scope.todos = todoModel.removeTodo( todo );
        };

        $scope.markAll = function ( completed ) {
            $scope.todos = todoModel.markAll( completed );
        };

        $scope.clearCompletedTodos = function () {
            $scope.todos = todoModel.clearCompletedTodos();
        };

        $scope.$watch( 'todos', function ( newValue, oldValue ) {

            $scope.remainingCount = todoModel.getRemainingCount();
            $scope.completedCount = todoModel.getCompletedCount();
            $scope.allChecked = todoModel.getAllChecked;

            // This prevents unneeded calls to the local storage
            if ( newValue !== oldValue ) {
//                todoModel.saveTodos( $scope.todos );
                //todoModel.updateAllTodos( newValue );
            }
        }, true);

        // ---------------- STILL NEEDS EDITING ---------------- //

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        // Monitor the current route for changes and adjust the filter accordingly.
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        // live edit and undo features

        $scope.editedTodo = null;

        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }
            else {
                todoModel.updateTodo( todo );
            }
        };

        // undo features could also be in the DDD entity
        $scope.revertEditing = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

    });