angular.module('todomvc')
    .service('TodoCollection', function (TodoAPIService) {
        'use strict';

        /**
         * Get Todos
         */
        function getTodos() {
            return TodoAPIService.query();
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

           return TodoAPIService.save(todoToAdd);
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

            return TodoAPIService.update(todoToUpdate);
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

            TodoAPIService.delete(todoToDelete);
        }

        return {
            getTodos: getTodos,
            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        }

    });

