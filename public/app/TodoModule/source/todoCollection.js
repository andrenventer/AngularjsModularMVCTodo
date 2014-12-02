
angular.module('todomvc').service('todoCollection', function($resource) {
    return $resource('http://localhost:3000/todos/:id');
});