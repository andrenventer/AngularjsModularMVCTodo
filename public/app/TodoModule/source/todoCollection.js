/**
 * Created by albert on 14/12/04.
 */
angular.module('todomvc').service('todoCollection', function($resource) {
    return $resource('http://localhost:3000/todos/:id',
        {
            id: '@id'
        },
        {
            update: { method: 'PUT' }
        }
    );
});
