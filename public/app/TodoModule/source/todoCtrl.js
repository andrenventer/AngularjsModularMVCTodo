angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoEntity, todoREST, todoModel) {
        'use strict';

        var todos = todoModel.loadAllTodos();
//        todoREST.getAll().then(function(todos) {
//            todoModel.applyDomainRules(todos.data);
//            $scope.todosFromRest = todos.data;
//        });

        var model_todos = $scope.todos = todoEntity.load();
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
            $scope.remainingCount = $filter('filter')(model_todos, { completed: false }).length;
            $scope.completedCount = model_todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoEntity.save(model_todos);
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

        $scope.revertEditing = todoModel.revertEditing( $scope.todo );
//        $scope.revertEditing = function (todo) {
//            model_todos[model_todos.indexOf(todo)] = $scope.originalTodo;
//            $scope.doneEditing($scope.originalTodo);
//        };

        // prime candidates for DDD entity

        $scope.markAll = todoModel.markAll( $scope.allChecked );
//        $scope.markAll = function (completed) {
//            model_todos.forEach(function (todo) {
//                todo.completed = !completed;
//            });
//        };

        $scope.removeTodo = todoModel.removeTodo( todo );
//        $scope.removeTodo = function (todo) {
//            model_todos.splice(model_todos.indexOf(todo), 1);
//        };

        $scope.addTodo = todoModel.addTodo();
//        $scope.addTodo = function () {
//            var newTodo = $scope.newTodo.trim();
//            if (!newTodo.length) {
//                return;
//            }
//
//            model_todos.push({
//                title: newTodo,
//                completed: false
//            });
//
//            $scope.newTodo = '';
//        };

        $scope.editTodo = todoModel.editTodo( todo );
//        $scope.editTodo = function (todo) {
//            $scope.editedTodo = todo;
//            // Clone the original to restore it on demand.
//            $scope.originalTodo = angular.extend({}, todo);
//        };

        $scope.clearCompletedTodos = todoModel.clearCompletedTodos();
//        $scope.clearCompletedTodos = function () {
//            $scope.todos = model_todos = model_todos.filter(function (val) {
//                return !val.completed;
//            });
//        };

    });