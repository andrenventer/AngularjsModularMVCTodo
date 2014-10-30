angular.module('todomvc')
    .service('todoModel', function (todoEntity) {
        'use strict';

        var todos = todoEntity.load();

        function saveTodos(todos){
            todoEntity.save(todos);
        }

        function addTodo(newTodo){
            todos.push({
                title: newTodo,
                completed: false
            });
//            saveTodos(todos);
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

            saveTodos: function(todos){
                saveTodos(todos)
            },

            addNewTodo: function(newTodo){
                addTodo(newTodo)
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