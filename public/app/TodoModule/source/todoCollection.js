angular.module('todomvc')
    .service('TodoCollection', function (TodoAPIService) {
        'use strict';

        var todos = null;

        /**
         * Get initial Todo list
         */
        getAllTodos();

        function getAllTodos() {
            // Load initial state object
            todos = TodoAPIService.query();
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

            var savedTodo = TodoAPIService.save(todoToAdd);

            // Add to state object
            todos.push(savedTodo);
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

            var updatedTodo = TodoAPIService.update(todoToUpdate);

            // Update state object
            todos[todos.indexOf(todo)] = updatedTodo;
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

            // Remove from state object
            todos.splice(todos.indexOf(todo), 1);
        }

        /**
         * Clear all completed Todo's from the list
         *
         * @returns {*}
         */
        function clearCompletedTodos() {

            for(var i = 0; i < todos.length; i++) {

                if(todos[i].completed) {
                    deleteTodo(todos[i]);
                    i--;
                }
            }

            return todos;
        }

        return {
            todos: todos,
            getAllTodos: getAllTodos,
            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            clearCompletedTodos: clearCompletedTodos
        }

    });

