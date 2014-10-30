(function () {
    'use strict';

    describe('Todo Controller', function () {
        var ctrl, scope;
        var todoList;
        var todoEntity = {
            storage: {},
            load: function () {
                return this.storage;
            },
            save: function (value) {
                this.storage = value;
            }
        };

        function postsFromRestAPI(){
            return [
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
        }

        function postFromRestAPI(){
            return {
                    id: 3,
                    title: "==> Three",
                    completed: false
                };
        }

        // Load the module containing the app, only 'ng' is loaded by default.
        beforeEach(module('todomvc'));

        var model;

        beforeEach(inject(function ($controller, $rootScope, $httpBackend, todoModel) {
            scope = $rootScope.$new();
            ctrl = $controller('TodoCtrl', { $scope: scope });
            $httpBackend.when('GET', 'http://localhost:3000/todos').respond(postsFromRestAPI);
            $httpBackend.when('GET', 'http://localhost:3000/todos/3').respond(postFromRestAPI);
            model = todoModel;
        }));

        it('should not have an edited Todo on start', function () {
            expect(scope.editedTodo).toBeNull();
        });

        it('should not have any Todos on start', function () {
            expect(scope.todos.length).toBe(0);
        });

        it('should have all Todos completed', function () {
            scope.$digest();
            expect(scope.allChecked).toBeTruthy();
        });

        describe('the filter', function () {
            it('should default to ""', function () {
                scope.$emit('$routeChangeSuccess');

                expect(scope.status).toBe('');
                expect(scope.statusFilter).toBeNull();
            });

            describe('being at /active', function () {
                it('should filter non-completed', inject(function ($controller) {
                    ctrl = $controller('TodoCtrl', {
                        $scope: scope,
                        $routeParams: {
                            status: 'active'
                        }
                    });

                    scope.$emit('$routeChangeSuccess');
                    expect(scope.statusFilter.completed).toBeFalsy();
                }));
            });

            describe('being at /completed', function () {
                it('should filter completed', inject(function ($controller) {
                    ctrl = $controller('TodoCtrl', {
                        $scope: scope,
                        $routeParams: {
                            status: 'completed'
                        }
                    });

                    scope.$emit('$routeChangeSuccess');
                    expect(scope.statusFilter.completed).toBeTruthy();
                }));
            });
        });

        describe('having no Todos', function () {
            var ctrl;

            beforeEach(inject(function ($controller) {
                todoEntity.storage = [];
                ctrl = $controller('TodoCtrl', {
                    $scope: scope,
                    todoEntity: todoEntity
                });
                scope.$digest();
            }));

            it('should not add empty Todos', function () {
                scope.newTodo = '';
                scope.addTodo();
                scope.$digest();
                expect(scope.todos.length).toBe(0);
            });

            it('should not add items consisting only of whitespaces', function () {
                scope.newTodo = '   ';
                scope.addTodo();
                scope.$digest();
                expect(scope.todos.length).toBe(0);
            });


            it('should trim whitespace from new Todos', function () {
                scope.newTodo = '  buy some unicorns  ';
                scope.addTodo();
                scope.$digest();
                expect(scope.todos.length).toBe(1);
                expect(scope.todos[0].title).toBe('buy some unicorns');
            });
        });

        describe('having some saved Todos', function () {
            var ctrl;

            beforeEach(inject(function ($controller) {
                todoList = [
                    {
                        'title': 'Uncompleted Item 0',
                        'completed': false
                    },
                    {
                        'title': 'Uncompleted Item 1',
                        'completed': false
                    },
                    {
                        'title': 'Uncompleted Item 2',
                        'completed': false
                    },
                    {
                        'title': 'Completed Item 0',
                        'completed': true
                    },
                    {
                        'title': 'Completed Item 1',
                        'completed': true
                    }
                ];

                todoEntity.storage = todoList;
                ctrl = $controller('TodoCtrl', {
                    $scope: scope,
                    todoEntity: todoEntity
                });
                scope.$digest();
            }));

            it('should count Todos correctly', function () {
                expect(scope.todos.length).toBe(5);
                expect(scope.remainingCount).toBe(3);
                expect(scope.completedCount).toBe(2);
                expect(scope.allChecked).toBeFalsy();
            });

            it('should save Todos to local storage', function () {
                expect(todoEntity.storage.length).toBe(5);
            });

            it('should remove Todos w/o title on saving', function () {
                var todo = todoList[2];
                todo.title = '';

                scope.doneEditing(todo);
                expect(scope.todos.length).toBe(4);
            });

            it('should trim Todos on saving', function () {
                var todo = todoList[0];
                todo.title = ' buy moar unicorns  ';

                scope.doneEditing(todo);
                expect(scope.todos[0].title).toBe('buy moar unicorns');
            });

            it('clearCompletedTodos() should clear completed Todos', function () {
                model.clearCompletedTodos();
                expect(model.todos.length).toBe(5);
            });

            it('markAll() should mark all Todos completed', function () {
                scope.markAll();
                scope.$digest();
                expect(scope.completedCount).toBe(5);
            });

            it('revertTodo() get a Todo to its previous state', function () {
                var todo = todoList[0];
                scope.editTodo(todo);
                todo.title = 'Unicorn sparkly skypuffles.';
                scope.revertEditing(todo);
                scope.$digest();
                expect(scope.todos[0].title).toBe('Uncompleted Item 0');
            });
        });
    });
}());
