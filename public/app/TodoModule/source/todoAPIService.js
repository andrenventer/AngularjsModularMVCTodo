angular.module('todomvc')
    .service('TodoAPIService', function ($resource) {
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

