angular.module('todomvc')
    .factory('TodoCollectionFactory', function (TodoAPIFactory) {
        'use strict';

        /**
         * Get Todos
         */

        function getAllTodos() {
            return TodoAPIFactory.list();
        }

        function getActiveTodos() {
            return TodoAPIFactory.list( {completed:false} );
        }

        function getCompletedTodos() {
            return TodoAPIFactory.list( {completed:true} );
        }

        /**
         * Add a new Todo
         *
         * @param title
         */
        function addTodo(title) {

            if (!title.length) {
                return;
            }

            title = title.trim();

            var todoToAdd = {
                "id": null,
                "title": title,
                "completed": false
            };

           return TodoAPIFactory.create(todoToAdd);
        }

        /**
         * Update a Todo
         *
         * @param todo
         */
        function updateTodo(todo) {
            var todoToUpdate = {
                "id": todo.id,
                "title": todo.title,
                "completed": todo.completed
            };

            return TodoAPIFactory.update(todoToUpdate);
        }

        /**
         * Delete a Todo
         *
         * @param todo
         */
        function deleteTodo(todo) {
            var todoToDelete = {
                "id": todo.id
            };

            TodoAPIFactory.delete(todoToDelete);
        }

        return {
            getAllTodos: getAllTodos,
            getActiveTodos: getActiveTodos,
            getCompletedTodos: getCompletedTodos,
            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        }

    });