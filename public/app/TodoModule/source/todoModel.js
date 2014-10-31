
angular.module('todomvc')
    .service('todoModel', function ( todoEntity ) {
        'use strict';

        var newTodo = '';
        var todos = todoEntity.load();

        var remainingCount;
        var completedCount = 0;

        function addToDo( todo ) {
            newTodo = todo.trim();

            if ( newTodo.length ) {
                todos.push({
                    title: newTodo,
                    completed: false
                });
            }

            return todos;
        }

        function saveTodos( todos ){
            todoEntity.save( todos );
        }

        function calculateRemainingTodos() {
            remainingCount = 0;

            for( var i = 0; i < todos.length; i++ ) {
                if( todos[i].completed === false)
                    remainingCount++;
            }

            return remainingCount;
        }

        function calculateCompletedTodos() {
            completedCount = todos.length - remainingCount;

            return completedCount;
        }

        function getAllChecked() {
            return !remainingCount;
        }

        function removeTodo( todo ) {
            todos.splice(todos.indexOf(todo), 1);

            return todos;
        }

        function markAll( completed ) {
            todos.forEach( function ( todo ) {
                todo.completed = !completed;
            });

            return todos;
        }

        function clearCompletedTodos() {
            todos = todos.filter(function (val) {
                return !val.completed;
            });

            return todos;
        }

        function transformTitles (todos) {
            for (var i = 0; i < todos.length; i++){
                todos[i].title = "==> " + todos[i].title;
            }
            return todos;
        }

        return{

            todos: todos,

            getRemainingCount: function() {
               return calculateRemainingTodos();
            },

            getCompletedCount: function() {
                return calculateCompletedTodos();
            },

            getAllChecked: function() {
                return getAllChecked();
            },

            loadTodos: function() {
                return todos;
            },

            addTodos: function( newTodo ) {
                return addToDo( newTodo );
            },

            saveTodos: function( todos ) {
                saveTodos( todos );
            },

            removeTodo: function( todo ) {
                return removeTodo( todo );
            },

            markAll: function( completed ) {
                return markAll( completed );
            },

            clearCompletedTodos: function() {
                return clearCompletedTodos();
            },

            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });