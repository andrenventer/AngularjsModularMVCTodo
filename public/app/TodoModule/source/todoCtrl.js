angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoEntity, todoREST, todoModel) {
        'use strict';

        $scope.persistTodos = function() {
            todoModel.persistTodos();
        };

        $scope.refresh = function(){
            console.log(todoModel.getTodosFromRest());
            console.log(todoModel.getTodosFromIndexedDB());
        };

        $scope.$on('todoModel::gotTodosFromRestEvent', function(event) {
            $scope.todosFromRest = todoModel.getTodosFromRest();
        });
        $scope.$on('todoModel::gotTodosFromIndexedDB', function(event) {
            $scope.todosFromIndexedDB = todoModel.getTodosFromIndexedDB();
        });

        todoModel.todos = $scope.todos = todoEntity.load();
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
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoEntity.save(todoModel.todos);
            }
        }, true);

        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }
        };

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
            todoModel.todos.splice(todoModel.todos.indexOf(todo), 1);
        };

        $scope.addTodo = function () {
            var newTodo = $scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }

            todoModel.todos.push({
                title: newTodo,
                completed: false
            });

            $scope.newTodo = '';
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.clearCompletedTodos = function () {
            $scope.todos = todoModel.clearCompletedTodos();
        };

    });