angular.module('todomvc')
    .service('todoModel', ['$rootScope', 'todoEntity', function ( $rootScope, todoEntity ) {
        'use strict';

        var todos = [];

        // Load Todos
        function loadAllTodos() {
            todos = todoEntity.load();
            $rootScope.$broadcast('todoModel::loadAllTodos');
        };
        loadAllTodos();

        function saveAllTodos( todosFromController ) {
            todoEntity.save( todosFromController );
        }

        // Mark all Todos
        function markAll( status ) {
            todos.forEach(function ( todo ) {
                todo.completed = !status;
            });
        };

        // Remove Todo
        function removeTodo( todo ) {
            todos.splice( todos.indexOf( todo ), 1 );
            todoEntity.save( todos );
        };

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
        };

        // Clear completed Todos
        function clearCompletedTodos() {
            todos = todos.filter(function (val) {
                return !val.completed;
            });
        };

        // Return
        return{
            todos: todos,
            saveAllTodos: function( todosFromController ) {
                saveAllTodos( todosFromController );
            },
            markAll: markAll,
            removeTodo: removeTodo,
            addTodo: addTodo,
            clearCompletedTodos: clearCompletedTodos
        }

    }]);