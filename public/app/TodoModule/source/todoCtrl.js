angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoModel) {
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
//
//        var todos = $scope.todos = todoEntity.load();
//        $scope.newTodo = '';

        var todos = todoModel.loadTodos();
        $scope.todos = todos;
        $scope.newTodo = '';
        $scope.editedTodo = null;
//        $scope.editedTodo = todoModel.getEditedTodo();
//        $scope.originalTodo = todoModel.getOriginalTodo();

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
                todoModel.saveTodos(todos);
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
            todoModel.clearCompletedTodos();
            // ??????????????????????????????????????????????????????????///
            todos = $scope.todos = todoModel.loadTodos();
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
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };


    });