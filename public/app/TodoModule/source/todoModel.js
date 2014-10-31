angular.module('todomvc')
    .service('todoModel', function (todoEntity) {
        'use strict';

        var todos = todoEntity.load();
        var remainingCount;
        var completedCount;
//        var editedTodo = null;
//        var originalTodo;

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

//        function editTodo(todo){
//            editedTodo = todo;
//            // Clone the original to restore it on demand.
//            originalTodo = angular.extend({}, todo);
//        }
//
//        function doneEditing(todo){
//            editedTodo = null;
//            todo.title = todo.title.trim();
//
//            if (!todo.title) {
//                $scope.removeTodo(todo);
//            }
//
//            return todos;
//        }

        function clearCompletedTodos(){
            todos = todos.filter(function (val) {
                return !val.completed;
            });
            saveTodos(todos);
        }

        function calculateRemainingCount(){
            remainingCount = 0;
            todos.forEach(function(todo){
               if (todo.completed === false){
                   remainingCount++;
               }
            });
            return remainingCount;
        }

        function calculateCompletedCount(){
            completedCount = todos.length - remainingCount;
            return completedCount;
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

//            getEditedTodo: function(){
//                return editedTodo;
//            },
//
//            getOriginalTodo: function(){
//                return originalTodo;
//            },

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

//            editTodo: function(todo){
//                editTodo(todo);
//            },
//
//            doneEditing: function(todo){
//                return doneEditing(todo);
//            },

            clearCompletedTodos: function(todo){
                clearCompletedTodos(todo);
            },

            calculateRemainingCount: function(){
                return calculateRemainingCount();
            },

            calculateCompletedCount: function(){
                return calculateCompletedCount();
            },

            applyDomainRules: function(todos){
                transformTitles(todos);
            }
        }

    });
