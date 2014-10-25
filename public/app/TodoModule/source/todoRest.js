
angular.module('todomvc')
    .service('todoREST', function ($http) {
        'use strict';

        return{

            getAll: function(){
                return $http.get('http://localhost:3000/posts');
            },

            getOne: function(id){
                return $http.get('http://localhost:3000/posts/' + id);
            }

        }

    });