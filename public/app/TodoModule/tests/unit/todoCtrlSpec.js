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
            return [{"id":1,"title":"Mouse, turning to Alice. 'What IS the fun?' said Alice..","body":"Exactly as we were. My notion was that you couldn't cut off a bit of the doors of the door and.","tags":[1,3]},{"id":2,"title":"Duchess said to herself, 'in my going out.","body":"I fancy--Who's to go with the end of every line: 'Speak roughly to your little boy, And beat him when he pleases!' CHORUS. 'Wow! wow! wow!'.","tags":[3,5]},{"id":3,"title":"MARMALADE', but to her feet in the air. She did not wish to offend the Dormouse began.","body":"Duchess; 'and that's a fact.' Alice did not get hold of anything, but she stopped hastily, for the moment.","tags":[1,2]},{"id":4,"title":"As soon as the jury had a vague sort of chance of her hedgehog. The.","body":"Knave shook his head mournfully. 'Not I!' said the Dormouse; '--well.","tags":[]},{"id":5,"title":"The Knave of Hearts, who only bowed and smiled in reply..","body":"The players all played at once set to partners--' '--change lobsters, and retire in same order,' continued the.","tags":[]},{"id":6,"title":"I don't want to get hold of its mouth and yawned once or twice, half hoping that the cause.","body":"Alice. 'That's the judge,' she said to Alice, very much confused, 'I don't know one,' said.","tags":[1,4]},{"id":7,"title":"Alice. 'That's the first witness,' said the.","body":"Alice. 'I wonder what they WILL do next! If they had settled down again, the Dodo suddenly called out in a shrill, loud voice, and the poor little thing howled so, that he shook both his shoes off. 'Give your evidence,' the King eagerly, and he wasn't going.","tags":[3,4]},{"id":8,"title":"Alice, very much of it appeared. 'I don't think they play at all anxious.","body":"Poor Alice! It was as long as there was hardly room for YOU, and no room to grow up any more questions about it, you know--' 'What did they live at the March Hare. Visit either you like: they're both mad.' 'But I don't know,'.","tags":[5,1]},{"id":9,"title":"THEN--she found herself in Wonderland, though she knew she had gone through.","body":"Mouse only growled in reply. 'That's right!' shouted the Queen, stamping on the bank, and of.","tags":[]},{"id":10,"title":"Mock Turtle, and to her to wink with one eye; 'I seem to put.","body":"Rabbit's voice along--'Catch him, you by the.","tags":[1,4]},{"id":11,"title":"I suppose you'll be asleep again before it's done.' 'Once.","body":"Queen, 'and he shall tell you his history,' As they walked off together. Alice was not quite like the largest telescope that ever was! Good-bye, feet!' (for when she got to the law, And argued each case with MINE,' said the Duck. 'Found IT,' the Mouse replied rather impatiently: 'any shrimp.","tags":[4,3]},{"id":12,"title":"The rabbit-hole went straight on like a stalk out of THIS!' (Sounds of more broken.","body":"Duchess sneezed occasionally; and as he fumbled over the edge with each hand. 'And now which is which?' she said to the game. CHAPTER IX. The Mock Turtle persisted. 'How COULD he turn them out with trying, the poor little thing sat down with wonder at the sides.","tags":[]},{"id":13,"title":"Hatter, 'I cut some more bread-and-butter--' 'But what am I then? Tell me that.","body":"I was a sound of a bottle. They all sat down at once, while all the first day,' said the Duchess; 'I never said I didn't!' interrupted Alice. 'You are,' said.","tags":[3,4,5]},{"id":14,"title":"Alice. 'You must be,' said the Gryphon: 'I went to the table for it, while the rest of the.","body":"PROVES his guilt,' said the Duchess, as she was considering in her French lesson-book. The Mouse did not like the Queen?' said the Pigeon; 'but I must be on the second thing is to do that,' said.","tags":[3]},{"id":15,"title":"I can creep under the circumstances. There was nothing on it in a low voice..","body":"Cat said, waving its right paw round, 'lives a Hatter: and in another moment, splash! she was now only ten inches high, and she felt a little irritated at the bottom of a dance is.","tags":[1]},{"id":16,"title":"Lizard as she could. 'The Dormouse is asleep again,' said the Mock Turtle replied; 'and then the.","body":"Queen's absence, and were resting in the back. At last the Gryphon at the picture.) 'Up, lazy thing!' said the Mock Turtle's heavy sobs. Lastly, she.","tags":[]},{"id":17,"title":"KNOW IT TO BE TRUE--\" that's the queerest thing about it.' (The jury all brightened.","body":"CAN I have dropped them, I wonder?' As she said to herself;.","tags":[]},{"id":18,"title":"Here the Dormouse go on in the sand with wooden spades, then a.","body":"HAVE my shoulders got to? And oh, I wish I had to sing \"Twinkle, twinkle, little bat! How I wonder if I like being that person, I'll come up: if not, I'll stay down here! It'll be no.","tags":[4,3,2]},{"id":19,"title":"I've seen that done,' thought Alice. 'Now we shall get on better.' 'I'd rather not,' the Cat.","body":"But do cats eat bats, I wonder?' And here poor Alice in a great hurry to get very tired of sitting by her sister was reading, but it was a general.","tags":[]},{"id":20,"title":"I give it up,' Alice replied: 'what's the answer?' 'I haven't opened it yet,' said.","body":"I was going to do THAT in a melancholy tone. 'Nobody seems to like her, down here, that I should frighten them out again. Suddenly she came upon a little shriek, and went in. The door led right into it..","tags":[]},{"id":21,"title":"This time Alice waited a little, and then they wouldn't be so easily offended, you.","body":"Mystery,' the Mock Turtle replied in a low, timid voice, 'If you can't be civil, you'd better leave off,' said the last concert!' on which the March Hare went 'Sh! sh!' and the pattern on their faces, so that they couldn't.","tags":[]},{"id":22,"title":"Oh, my dear paws! Oh my fur and whiskers! She'll get me executed, as sure as.","body":"There was no one could possibly hear you.' And certainly there was no use in saying.","tags":[1]},{"id":23,"title":"Alice heard it before,' said Alice,) and round goes the clock in a low voice,.","body":"CHAPTER VI. Pig and Pepper For a minute or two sobs choked.","tags":[]},{"id":24,"title":"Duchess, as she fell past it. 'Well!' thought.","body":"MINE,' said the King, and the small ones choked and had no pictures or conversations?' So she stood still where she was ready to agree to everything that.","tags":[2,3,5]},{"id":25,"title":"When the Mouse to Alice a little way out of its voice. 'Back to land.","body":"But do cats eat bats?' and sometimes, 'Do bats eat cats?' for, you see, as they would die. 'The trial cannot proceed,' said the voice. 'Fetch me my gloves this moment!' Then came a little girl or a watch to take the roof bear?--Mind that loose slate--Oh, it's coming down! Heads.","tags":[]},{"id":26,"title":"Alice would not give all else for two reasons. First, because I'm.","body":"Waiting in a more subdued tone, and added with a little quicker. 'What a pity it wouldn't stay!' sighed the Hatter..","tags":[2]},{"id":27,"title":"And she kept fanning herself all the rats and--oh dear!'.","body":"I hate cats and dogs.' It was so ordered about by mice and rabbits. I.","tags":[1]},{"id":28,"title":"Gryphon. Alice did not come the same as the White Rabbit..","body":"Alice soon began talking to him,' the Mock Turtle replied; 'and then the Rabbit's little white kid gloves and a long and a piece of bread-and-butter in the lap of her head was so large in the flurry of.","tags":[]},{"id":29,"title":"Crab took the hookah into its eyes were nearly out of the.","body":"Queen: so she waited. The Gryphon lifted up both its paws in surprise. 'What! Never heard of one,' said Alice. 'Then you shouldn't talk,' said the Dormouse: 'not in that.","tags":[4,5]},{"id":30,"title":"Then it got down off the cake. * * CHAPTER II. The Pool of Tears.","body":"Alice, as the doubled-up soldiers were always getting up and walking away. 'You insult me by talking such nonsense!' 'I didn't know it to be true): If she.","tags":[]},{"id":31,"title":"Alice replied in a rather offended tone, 'was, that the Gryphon went on..","body":"Soup? Pennyworth only of beautiful Soup? Pennyworth only of beautiful Soup? Pennyworth only of beautiful Soup? Beau--ootiful Soo--oop! Beau--ootiful Soo--oop! Beau--ootiful Soo--oop! Soo--oop of the hall: in fact she was dozing off,.","tags":[]},{"id":32,"title":"Alice, swallowing down her flamingo, and began smoking.","body":"Alice replied very readily: 'but that's because it stays the same thing a bit!' said the Caterpillar. Alice said nothing: she had sat down again in a low trembling voice, '--and I hadn't to bring tears into her head. 'If I.","tags":[1,4]},{"id":33,"title":"Rabbit whispered in reply, 'for fear they should forget.","body":"I'm afraid, but you might knock, and I could not think of nothing else to do, and in his turn; and both the hedgehogs were out of the garden, called out as loud as.","tags":[]},{"id":34,"title":"Mock Turtle sighed deeply, and drew the back of one flapper across.","body":"Mock Turtle is.' 'It's the oldest rule in the direction it pointed to, without trying to box her own mind (as well as she spoke, but no result seemed to quiver all over with diamonds, and walked two and two, as the rest of the wood for fear of killing somebody, so managed to swallow a morsel of.","tags":[1,5]},{"id":35,"title":"Mock Turtle yet?' 'No,' said Alice. 'Come on, then,' said the Cat, 'a dog's not mad. You grant.","body":"So she tucked her arm affectionately into Alice's, and they can't prove I did: there's no name signed at the corners: next the ten courtiers; these were ornamented all over with fright. 'Oh, I beg your acceptance of this sort of present!' thought Alice. 'I'm glad they've.","tags":[]},{"id":36,"title":"Mock Turtle interrupted, 'if you don't know of any use, now,' thought poor Alice, and she.","body":"I didn't know how to begin.' He looked anxiously over his shoulder with some curiosity. 'What a curious appearance in the same thing as \"I get what I used to queer things happening. While she was beginning to write.","tags":[]},{"id":37,"title":"The moment Alice appeared, she was holding, and she had.","body":"Queen ordering off her knowledge, as there was not even room for her. 'I wish I hadn't begun my tea--not above a week or so--and what with the next witness!' said.","tags":[]},{"id":38,"title":"Alice to herself, as she couldn't answer either question, it didn't sound at all this.","body":"Caterpillar. This was quite a chorus of 'There goes Bill!' then the Rabbit's voice; and the three gardeners, oblong and flat, with their heads off?' shouted the Queen of Hearts were seated on their backs.","tags":[]},{"id":39,"title":"Cheshire Cat sitting on a crimson velvet cushion; and, last of.","body":"I do,' said Alice sadly. 'Hand it over a little snappishly. 'You're enough to look down and looked very anxiously into her face, and was in the trial.","tags":[]},{"id":40,"title":"Alice, as the doubled-up soldiers were silent, and looked at them with large.","body":"King. (The jury all looked puzzled.) 'He must have a trial: For really this morning I've nothing to do: once or twice she had never forgotten that, if you don't like the tone of great curiosity. 'Soles and eels, of course,' said the Cat, as soon as it was talking in a whisper, half.","tags":[1,2,3,4]}]
        }

        function postFromRestAPI(){
            return {"id":3,"title":"MARMALADE', but to her feet in the air. She did not wish to offend the Dormouse began.","body":"Duchess; 'and that's a fact.' Alice did not get hold of anything, but she stopped hastily, for the moment.","tags":[1,2]}
        }

        // Load the module containing the app, only 'ng' is loaded by default.
        beforeEach(module('todomvc'));

        beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            ctrl = $controller('TodoCtrl', { $scope: scope });
            $httpBackend.when('GET', 'http://localhost:3000/todos').respond(postsFromRestAPI);
            $httpBackend.when('GET', 'http://localhost:3000/todos/3').respond(postFromRestAPI);
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
                scope.clearCompletedTodos();
                expect(scope.todos.length).toBe(3);
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
