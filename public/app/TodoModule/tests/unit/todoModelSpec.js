(function () {
    'use strict';

    describe('Model: todoModel', function () {

        var model, todoList;

        // Load the module containing the app, only 'ng' is loaded by default.
        beforeEach(module('todomvc'));

        beforeEach(inject(function (todoModel) {
            model = todoModel;
            todoList = [
                {
                    'title': 'Uncompleted Item 0',
                    'completed': false
                },
                {
                    'title': 'Uncompleted Item 1',
                    'completed': false
                },
                {
                    'title': 'Uncompleted Item 2',
                    'completed': false
                },
                {
                    'title': 'Completed Item 0',
                    'completed': true
                },
                {
                    'title': 'Completed Item 1',
                    'completed': true
                }
            ];
            model.todos = todoList;
        }));

        it('should be able to apply Domain Rules to posts', function () {

            var result = [
                {
                    id: 1,
                    title: "==> One",
                    completed: false
                },
                {
                    id: 2,
                    title: "==> Two <==",
                    completed: true
                },
                {
                    id: 3,
                    title: "==> Three",
                    completed: false
                }
            ];

            var input = [
                {
                    id: 1,
                    title: "One",
                    completed: false
                },
                {
                    id: 2,
                    title: "Two",
                    completed: true
                },
                {
                    id: 3,
                    title: "Three",
                    completed: false
                }
            ];

            model.applyDomainRules(input);

            expect(input[0]).toEqual(result[0]);

        });

        it('clearCompletedTodos() should clear completed Todos', function () {
            model.clearCompletedTodos();
            expect(model.todos.length).toBe(3);
        });

    });

}());