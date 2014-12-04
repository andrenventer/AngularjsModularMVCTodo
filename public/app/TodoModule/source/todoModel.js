angular.module('todomvc')
    .service('todoModel', function (todoCollection) {
        'use strict';

        var todos = null;

        /**
         * Get initial Todo list
         */
        getAllTodos();

        function getAllTodos() {
            // Load initial state object
            todos = todoCollection.query();
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

            todoCollection.save(todoToAdd);

            // Add to state object
            todos.push({
                title: title,
                completed: false
            });
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
            todoCollection.update(todoToUpdate);
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
            todoCollection.delete(todoToDelete);

            // Remove from state object
            todos.splice(todos.indexOf(todo), 1);
        }

        /**
         * Clear all completed Todo's from the list
         *
         * @returns {*}
         */
        function clearCompletedTodos() {
            this.todos = this.todos.filter(function (val) {

                if(val.completed)
                    todoCollection.delete(val);

                return !val.completed;
            });
            return this.todos;
        }

        return {
            todos: todos,
            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            clearCompletedTodos: clearCompletedTodos
        }

    });
