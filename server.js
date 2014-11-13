var server = require('json-server');

server.low.db = {
    "todos": [
        {
            id: 0,
            title: "Zero",
            completed: false
        },
        {
            id: 1,
            title: "One",
            completed: true
        },
        {
            id: 2,
            title: "Two",
            completed: false
        },
        {
            id: 3,
            title: "Three",
            completed: true
        },
        {
            id: 4,
            title: "Four",
            completed: true
        }
    ]
};

server.listen(3000);
