angular.module('todomvc')
    .service('todoModel', ['todoEntity', function ( todoEntity ) {
        'use strict';

        var todos = [];

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

        // Revert
        function revertEditing( todo ) {

        }

        return{

            loadAllTodos: function(){
                todos = todoEntity.load();
                return todos;
            },
            revertEditing: function( todo ) {
                todos[todos.indexOf( todo )] = $scope.originalTodo;
                //$scope.doneEditing( $scope.originalTodo );
                return todos;
            },
            applyDomainRules: function( todos ){
                transformTitles( todos );
            }
        }

    }]);