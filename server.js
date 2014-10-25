var server = require('json-server');

server.low.db = {
    "todos": [
        {
            id: 1,
            title: "One",
            completed: false
        },
        {
            id: 2,
            title: "Two",
            completed: true
        },
        {
            id: 3,
            title: "Three",
            completed: false
        }
    ]
};

server.listen(3000);
