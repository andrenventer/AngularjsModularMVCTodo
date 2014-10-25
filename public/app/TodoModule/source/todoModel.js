
angular.module('todomvc')
    .service('todoModel', function () {
        'use strict';

        function transformTitles (todos) {
            for (var i = 0; i < todos.length; i++){
                todos[i].title = "==> " + todos[i].title;
            }
            return todos;
        }

        return{
            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });