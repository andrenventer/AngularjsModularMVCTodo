angular.module('todomvc')
    .factory('TodoModelFactory', function (TodoCollectionFactory, TodoDomainRulesFactory) {
        'use strict';

        var todos = [];
        var remainingCount = 0;
        var completedCount = 0;

        /**
         * Get initial Todo list
         */
        todos = getAllTodos();

        function getAllTodos() {
            return TodoCollectionFactory.getAllTodos();
        }

        function getActiveTodos() {
            todos = TodoCollectionFactory.getActiveTodos();
            return todos;
        }

        function getCompletedTodos() {
            todos = TodoCollectionFactory.getCompletedTodos();
            return todos;
        }

        /**
         * Add a new Todo
         *
         * @param title
         */
        function addTodo(title) {

            title = TodoDomainRulesFactory.changeTodo( title );

            var savedTodo = TodoCollectionFactory.addTodo(title);

            // Add to state object
            todos.push(savedTodo);

            return todos;
        }

        /**
         * Update a Todo
         *
         * @param todo
         */
        function updateTodo(todo) {

            var updatedTodo = TodoCollectionFactory.updateTodo(todo);

            // Update state object
            todos[todos.indexOf(todo)] = updatedTodo;
        }

        /**
         * Delete a Todo
         *
         * @param todo
         */
        function deleteTodo(todo) {

            TodoCollectionFactory.deleteTodo(todo);

            // Remove from state object
            todos.splice(todos.indexOf(todo), 1);

            return todos;
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
        }

        /**
         * Calculate the number of remaining active todos
         *
         * @returns {number}
         */
        function calculateRemainingTodos() {
            remainingCount = 0;

            for( var i = 0; i < todos.length; i++ ) {
                if( todos[i].completed === false)
                    remainingCount++;
            }

            return remainingCount;
        }

        /**
         * Calculate the amount of completed todos
         *
         * @returns {number}
         */
        function calculateCompletedTodos() {
            completedCount = todos.length - remainingCount;

            return completedCount;
        }

        /**
         *
         * @returns {boolean}
         */
        function getAllChecked() {
            return !remainingCount;
        }

        return {
            getAllTodos: getAllTodos,
            getActiveTodos: getActiveTodos,
            getCompletedTodos: getCompletedTodos,

            calculateRemainingTodos: calculateRemainingTodos,
            calculateCompletedTodos: calculateCompletedTodos,
            getAllChecked: getAllChecked,

            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            clearCompletedTodos: clearCompletedTodos,
            markAll: markAll
        }

    });

