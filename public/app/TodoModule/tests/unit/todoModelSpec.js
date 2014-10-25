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

            var result = [{
                id: 3,
                title: "==> Mouse, turning to Alice. 'What IS the fun?' said Alice..",
                body: "Exactly as we were. My notion was that you couldn't cut off a bit of the doors of the door and."
            }];

            var input = [{
                id: 3,
                title: "Mouse, turning to Alice. 'What IS the fun?' said Alice..",
                body: "Exactly as we were. My notion was that you couldn't cut off a bit of the doors of the door and."
            }];

            model.applyDomainRules(input);

            expect(input[0]).toEqual(result[0]);

        });

    });

}());