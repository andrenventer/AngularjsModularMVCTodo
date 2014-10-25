
angular.module('todomvc')
    .service('todoModel', function () {
        'use strict';

        function transformTitles (posts) {
            for (var i = 0; i < posts.length; i++){
                posts[i].title = "==> " + posts[i].title;
            }
            return posts;
        }

        return{
            applyDomainRules: function(posts){
                transformTitles(posts);
            }
        }

    });