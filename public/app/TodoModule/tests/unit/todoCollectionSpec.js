(function () {
    'use strict';

    describe('Model: todoModel', function () {

        var model;

        // Load the module containing the app, only 'ng' is loaded by default.
        beforeEach(module('todomvc'));

        beforeEach(inject(function (todoModel) {
            model = todoModel;
        }));

        it('test name', function () {

        });

    });

}());