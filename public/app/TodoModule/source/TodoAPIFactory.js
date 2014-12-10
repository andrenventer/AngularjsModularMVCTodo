angular.module('todomvc')
    .factory('TodoAPIFactory', function ($resource) {
        return $resource('http://localhost:3000/todos/:id', {
                id: '@id'
            }, {
                create: {
                    method: 'POST'
                },
                read: {
                    method: 'GET'
                },
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                },
                list: {
                    method: 'GET',
                    isArray: true
                }
            }
        )
    });

