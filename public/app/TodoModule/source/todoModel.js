angular.module('todomvc')
    .service('todoModel', ['$rootScope', 'todoEntity', function ( $rootScope, todoEntity ) {
        'use strict';

        var todos = [];

        // Load Todos
        function loadAllTodos() {
            todos = todoEntity.load();
        }

        function saveAllTodos( todosFromController ) {
            todoEntity.save( todosFromController );
        }

        // Mark all Todos
        function markAll( status ) {
            todos.forEach(function ( todo ) {
                todo.completed = !status;
            });
        }

        // Remove Todo
        function removeTodo( todo ) {
            todos.splice( todos.indexOf( todo ), 1 );
            todoEntity.save( todos );
        }

        // Add Todo
        function addTodo( todo ) {
            todo = todo.trim();

            if (!todo.length) {
                return;
            }

            todos.push({
                title: todo,
                completed: false
            });

            todoEntity.save( todos );
        }

        // Clear completed Todos
        function clearCompletedTodos() {
            todos = todos.filter(function (val) {
                return !val.completed;
            });
            todoEntity.save( todos );
        }

        // Return
        return{
            getTodos: function() {
                return todos;
            },
            setTodos: function( todosFromController ) {
                todos = todosFromController;
            },
            loadAllTodos: loadAllTodos,
            saveAllTodos: function( todosFromController ) {
                saveAllTodos( todosFromController );
            },
            markAll: markAll,
            removeTodo: removeTodo,
            addTodo: addTodo,
            clearCompletedTodos: clearCompletedTodos
        }

    }]);