angular.module('todomvc')
    .service('TodoModel', function (TodoCollection, TodoDomainRulesFactory) {
        'use strict';

        var todos = null;

        /**
         * Get initial Todo list
         */
        getAllTodos();

        function getAllTodos() {
            // Load initial state object
            todos = TodoCollection.getTodos();
        }

        /**
         * Add a new Todo
         *
         * @param title
         */
        function addTodo(title) {

            title = TodoDomainRulesFactory.changeTodo( title );

            var savedTodo = TodoCollection.addTodo(title);

            // Add to state object
            todos.push(savedTodo);
        }

        /**
         * Update a Todo
         *
         * @param todo
         */
        function updateTodo(todo) {

            var updatedTodo = TodoCollection.updateTodo(todo);

            // Update state object
            todos[todos.indexOf(todo)] = updatedTodo;
        }

        /**
         * Delete a Todo
         *
         * @param todo
         */
        function deleteTodo(todo) {

            TodoCollection.deleteTodo(todo);

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

        /**
         * Mark all the Todo's as completed
         *
         * @param completed
         */
        function markAll( completed ) {
            todos.forEach(function (todo) {
                todo.completed = !completed;
                updateTodo( todo );
            });
        };

        return {
            todos: todos,
            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            clearCompletedTodos: clearCompletedTodos,
            markAll: markAll
        }

    });

