angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoEntity, todoREST, todoModel) {
        'use strict';

//        todoREST.getAll().then(function(todos) {
//            todoModel.applyDomainRules(todos.data);
//            $scope.todosFromRest = todos.data;
//            console.log($scope.todosFromRest);
//        });
//
//        var id = 3;
//        todoREST.getOne(id).then(function(todo) {
//            $scope.todo3FromRest = todo.data;
//        });

        var modelTodos = $scope.todos = todoModel.loadTodos();

        $scope.newTodo = '';

        $scope.addTodo = function() {
            todoModel.addTodos( $scope.newTodo );
            $scope.newTodo = '';
        };

        $scope.removeTodo = function ( todo ) {
            todoModel.removeTodo( todo );
        };

        $scope.markAll = function ( completed ) {
            todoModel.markAll( completed );
        };

        $scope.clearCompletedTodos = function () {
            todoModel.clearCompletedTodos();
        };

        // ---------------- STILL NEEDS EDITING ---------------- //

        $scope.$watch( 'modelTodos', function ( newValue, oldValue ) {
            $scope.remainingCount = todoModel.remainingCount();
            $scope.completedCount = todoModel.completedCount();
            $scope.allChecked = todoModel.allChecked;

            // This prevents unneeded calls to the local storage
            if ( newValue !== oldValue ) {
                todoModel.addTodos( $scope.newTodo );
            }
        }, true);

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
        };

        // undo features could also be in the DDD entity

        $scope.revertEditing = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

    });