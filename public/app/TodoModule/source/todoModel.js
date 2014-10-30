angular.module('todomvc')
    .service('todoModel', function (todoEntity) {
        'use strict';

        var todos = todoEntity.load();
        var editedTodo = null;
        var originalTodo;

        function saveTodos(todos){
            todoEntity.save(todos);
        }

        function addTodo(newTodo){
            todos.push({
                title: newTodo,
                completed: false
            });
        }

        function markAllTodos(completed){
            todos.forEach(function (todo) {
                todo.completed = !completed;
            });
        }

        function removeTodo(todo){
            todos.splice(todos.indexOf(todo), 1);
        }

        function editTodo(todo){
            editedTodo = todo;
            // Clone the original to restore it on demand.
            originalTodo = angular.extend({}, todo);
        }

        function doneEditing(todo){
            editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }
        }

        function clearCompletedTodos(todo){
            $scope.todos = todos = todos.filter(function (val) {
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

            loadTodos: function(){
                return todos;
            },

            getEditedTodo: function(){
                return editedTodo;
            },

            getOriginalTodo: function(){
                return originalTodo;
            },

            saveTodos: function(todos){
                saveTodos(todos);
            },

            addNewTodo: function(newTodo){
                addTodo(newTodo);
            },

            markAllTodos: function(completed){
                markAllTodos(completed);
            },

            removeTodo: function(todo){
                removeTodo(todo);
            },

            editTodo: function(todo){
                editTodo(todo);
            },

            doneEditing: function(todo){
                doneEditing(todo);
            },

            clearCompletedTodos: function(todo){
                clearCompletedTodos(todo);
            },

            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });

//define(['angular', '../module'], function (ng) {
//    'use strict';
//
//    ng.module('pet.models')
//        .service('PetModel', [
//
//            // add other Service name here to inject "subModule,"
//            'OtherModel',
//
//            function (OtherModel) {
//
//                var accumilator = 0;
//
//                var privatePetProp = 'petModel-privatePetProp';
//
//                function privatePropFunction(){
//                    return privatePetProp;
//                }
//
//                function privateFunction(){
//                    return 'petModel-privatePetFunc';
//                }
//
//                return {
//
//                    domainAccumilator: accumilator,
//
//                    petProp: 'petModel-petProp',
//
//                    otherProp: OtherModel.publicOtherProp,
//
//                    publicPetProp: privatePropFunction(),
//
//                    petFunc: function () {
//                        return 'petModel-petFunc';
//                    },
//
//                    publicPetFunc: function(){
//                        return privateFunction();
//                    },
//
//                    addSomething: function () {
//                        this.domainAccumilator = this.domainAccumilator + 1;
//                        return this.domainAccumilator;
//                    }
//
//                };
//
//            }
//
//        ]);
//
//});