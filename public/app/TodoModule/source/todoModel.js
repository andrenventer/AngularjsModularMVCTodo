
angular.module('todomvc')
    .service('todoModel', function ( todoEntity ) {
        'use strict';

        var newTodo = '';
        var todos = [];

        var remainingCount = 0;
        var completedCount = 0;

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

            todoEntity.save( todo );

            newTodo = '';
        }

        function transformTitles (todos) {
            for (var i = 0; i < todos.length; i++){
                todos[i].title = "==> " + todos[i].title;
            }
            return todos;
        }

        return{

            newTodo: newTodo,
            remainingCount: remainingCount,
            completedCount: completedCount,



            loadTodos: function() {
                return loadTodo();
            },

            addTodos: function( newTodo ) {
                addToDo( newTodo );
            },

            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });