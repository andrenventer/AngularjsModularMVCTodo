angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, todoModel) {
        'use strict';

//        todoREST.getAll().then(function(todosFromModel) {
//            todoModel.applyDomainRules(todosFromModel.data);
//            $scope.todosFromRest = todosFromModel.data;
//            console.log($scope.todosFromRest);
//        });
//
//        var id = 3;
//        todoREST.getOne(id).then(function(todo) {
//            $scope.todo3FromRest = todo.data;
//        });
//
//        var todosFromModel = $scope.todosFromModel = todoEntity.load();
//        $scope.newTodo = '';

        var todosFromModel = todoModel.loadTodos();
        $scope.todos = todosFromModel;
        $scope.newTodo = '';
        $scope.editedTodo = null;

        // Monitor the current route for changes and adjust the filter accordingly.

        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        // live edit and undo features

        $scope.$watch('todos', function (newValue, oldValue) {
            $scope.remainingCount = todoModel.calculateRemainingCount();
            $scope.completedCount = todoModel.calculateCompletedCount();
            $scope.allChecked = !$scope.remainingCount;

            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoModel.saveTodos(todosFromModel);
            }
        }, true);

        // moved to DDD entity

        $scope.addTodo = function(){
            var newTodo = $scope.newTodo.trim();
            if (newTodo.length > 0){
                todoModel.addNewTodo(newTodo);
            }
            $scope.newTodo = '';
        };

        $scope.markAll = function (completed) {
            todoModel.markAllTodos(completed);
        };

        $scope.removeTodo = function (todo) {
            todoModel.removeTodo(todo);
        };

        $scope.clearCompletedTodos = function () {
            todosFromModel = $scope.todos = todoModel.clearCompletedTodos();
        };

        // prime candidates for DDD entity

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }
        };

        $scope.revertEditing = function (todo) {
            todosFromModel[todosFromModel.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };


    });