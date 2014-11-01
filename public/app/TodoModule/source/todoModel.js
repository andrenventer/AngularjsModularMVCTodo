angular.module('todomvc')
    .service('todoModel', function () {
        'use strict';

        var todos;

        function transformTitles (todos) {
            for (var i = 0; i < todos.length; i++){
                if (todos[i].completed === false){
                    todos[i].title = "==> " + todos[i].title;
                }else if(todos[i].completed === true){
                    todos[i].title = "==> " + todos[i].title + " <==";
                }

            }
            return todos;
        }

        function clearCompletedTodos () {
            this.todos = this.todos.filter(function (val) {
                return !val.completed;
            });
            return this.todos;
        }

        return{

            todos: todos,

            applyDomainRules: function(todos){
                transformTitles(todos);
            },

            clearCompletedTodos: clearCompletedTodos
        }

    });