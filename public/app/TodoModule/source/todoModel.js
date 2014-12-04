angular.module('todomvc')
    .service('todoModel', function (todoCollection) {
        'use strict';

        var todos = todoCollection.query();

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

        function updateTodo(todo) {
            var todoToUpdate = {
                "id": todo.id,
                "title": todo.title,
                "completed": todo.completed
            };
            todoCollection.update(todoToUpdate);
        }

        function deleteTodo(todo) {
            var todoToDelete = {
                "id": todo.id
            };
            todoCollection.delete(todoToDelete);

            // Remove from state object
            todos.splice(todos.indexOf(todo), 1);
        }

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
