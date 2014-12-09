angular.module('todomvc')
    .service('TodoAPIFactory', function ($resource) {
        return $resource('http://localhost:3000/todos/:id',
            {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                }
            });
    });

