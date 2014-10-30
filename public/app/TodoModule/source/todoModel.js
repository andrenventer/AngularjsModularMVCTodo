angular.module('todomvc')
    .service('todoModel', function () {
        'use strict';

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

        return{
            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });