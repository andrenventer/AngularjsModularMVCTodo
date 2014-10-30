
angular.module('todomvc')
    .service('todoModel', function ( todoEntity ) {
        'use strict';

        var newTodo = '';
        var todos = [];

        var remainingCount = 0;
        var completedCount = 0;
        var allChecked = !remainingCount;

        function loadTodo() {
            todos = todoEntity.load();

            return todos;
        }

        function addToDo( todo ) {
            newTodo = todo.trim();
            if (!newTodo.length) {
                return;
            }

            todos.push({
                title: newTodo,
                completed: false
            });

            todoEntity.save( todos );
        }

        function calculateRemainingTodos() {
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

        function removeTodo( todo ) {
            todos.splice(todos.indexOf(todo), 1);
            todoEntity.save( todos );
        }

        function markAll( completed ) {
            todos.forEach( function ( todo ) {
                todo.completed = !completed;
            });

            todoEntity.save( todos );
        }

        function clearCompletedTodos() {
            todos = todos.filter(function (val) {
                return !val.completed;
            });
        }

        function transformTitles (todos) {
            for (var i = 0; i < todos.length; i++){
                todos[i].title = "==> " + todos[i].title;
            }
            return todos;
        }

        return{

            todos: todos,
            newTodo: newTodo,
            remainingCount: function() { return calculateRemainingTodos() },
            completedCount: function() { return calculateCompletedTodos() },
            allChecked: allChecked,

            loadTodos: function() {
                return loadTodo();
            },

            addTodos: function( newTodo ) {
                addToDo( newTodo );
            },

            removeTodo: function( todo ) {
                removeTodo( todo );
            },

            markAll: function( completed ) {
                markAll( completed );
            },

            clearCompletedTodos: function() {
                clearCompletedTodos();
            },

            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });