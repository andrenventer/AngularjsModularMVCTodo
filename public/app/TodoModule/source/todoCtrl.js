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

        var todos = $scope.todos = todoModel.loadTodos();

        console.log('var: ');
        console.log(todos);
        console.log('scope: ');
        console.log($scope.todos);

        $scope.newTodo = '';

        $scope.addTodo = function() {
            todoModel.addTodos( $scope.newTodo );
        };

//        $scope.addTodo = function () {
//
//            console.log('called');
//
//            var newTodo = $scope.newTodo.trim();
//            if (!newTodo.length) {
//                return;
//            }
//
//            todos.push({
//                title: newTodo,
//                completed: false
//            });
//
//            $scope.newTodo = '';
//        };

//        $scope.$watch('todos', function (newValue, oldValue) {
//            $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
//            $scope.completedCount = todos.length - $scope.remainingCount;
//            $scope.allChecked = !$scope.remainingCount;
//            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
//                todoEntity.save(todos);
//            }
//        }, true);

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

        // prime candidates for DDD entity

        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                todo.completed = !completed;
            });
        };

        $scope.removeTodo = function (todo) {
            todos.splice(todos.indexOf(todo), 1);
        };

        $scope.clearCompletedTodos = function () {
            $scope.todos = todos = todos.filter(function (val) {
                return !val.completed;
            });
        };

    });