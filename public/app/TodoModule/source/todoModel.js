angular.module('todomvc')
    .service('todoModel', ['$rootScope', 'todoREST', 'indexedDBDataService', function ($rootScope, todoREST, indexedDBDataService) {
        'use strict';

        var todos;

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

        var todosFromRest = [];

        function getAllTodosFromRest() {
            todoREST.getAll().then(function (result) {
                transformTitles(result.data);
                todosFromRest = result.data;
                $rootScope.$broadcast('todoModel::gotTodosFromRestEvent');
            });
        }

        getAllTodosFromRest();

        var todosFromIndexedDB = [];

        function refreshList() {
            indexedDBDataService.getTodos().then(function (data) {
                todosFromIndexedDB = data;
                $rootScope.$broadcast('todoModel::gotTodosFromIndexedDB');
            }, function (err) {
                console.log(err);
            });
        };

        function addTodo(todoText) {
            indexedDBDataService.addTodo(todoText).then(function () {
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
            for(var i = 0; i < todosFromRest.length; i++){
                addTodo(todosFromRest[i].title)
            }
        }

        return {

            todos: todos,

            todosFromRest: todosFromRest,

            todosFromIndexedDB: todosFromIndexedDB,

            applyDomainRules: function (todos) {
                transformTitles(todos)
            },

            clearCompletedTodos: clearCompletedTodos,

            persistTodos: persistTodos
        }

    }]);