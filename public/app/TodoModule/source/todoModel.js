angular.module('todomvc')
    .service('todoModel', ['$rootScope', 'todoREST', 'indexedDBDataService', function ($rootScope, todoREST, indexedDBDataService) {
        'use strict';

        var todos;
        var todosFromRest;
        var todosFromIndexedDB;

        function transformTitles(todos) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].completed === false) {
                    todos[i].title = "==> " + todos[i].title;
                } else if (todos[i].completed === true) {
                    todos[i].title = "==> " + todos[i].title + " <==";
                }

            }
            return todos;
        }

        function clearCompletedTodos() {
            this.todos = this.todos.filter(function (val) {
                return !val.completed;
            });
            return this.todos;
        }


        function getAllTodosFromRest() {
            todoREST.getAll().then(function (result) {
                todosFromRest = result.data;
                $rootScope.$broadcast('todoModel::gotTodosFromRestEvent');
            });
        }

        function getTodosFromRest() {
            return todosFromRest;
        }

        getAllTodosFromRest();

        function refreshList() {
            indexedDBDataService.getTodos().then(function (data) {
                todosFromIndexedDB = data;
                $rootScope.$broadcast('todoModel::gotTodosFromIndexedDB');
            }, function (err) {
                console.log(err);
            });
        };

        function getTodosFromIndexedDB() {
            return todosFromIndexedDB;
        }

        function addTodo(todo) {
            indexedDBDataService.addTodo(todo).then(function () {
                refreshList();
            }, function (err) {
                console.log(err);
            });
        };

        function deleteTodo(id) {
            indexedDBDataService.deleteTodo(id).then(function () {
                refreshList();
            }, function (err) {
                console.log(err);
            });
        };

        function indexedDB() {
            indexedDBDataService.open().then(function () {
                refreshList();
            });
        }

        indexedDB();

        function persistTodos() {
            for (var i = 0; i < todosFromRest.length; i++) {
                addTodo(todosFromRest[i])
            }
        }

        return {

            todos: todos,

            getTodosFromRest: getTodosFromRest,

            getTodosFromIndexedDB: getTodosFromIndexedDB,

            applyDomainRules: function (todos) {
                transformTitles(todos)
            },

            clearCompletedTodos: clearCompletedTodos,

            persistTodos: persistTodos
        }

    }]);
