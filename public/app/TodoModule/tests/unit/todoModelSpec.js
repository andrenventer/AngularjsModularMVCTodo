(function () {
    'use strict';

    describe('Model: todoModel', function () {

        var model;

        // Load the module containing the app, only 'ng' is loaded by default.
        beforeEach(module('todomvc'));

        beforeEach(inject(function (todoModel) {
            model = todoModel;
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

    });

}());