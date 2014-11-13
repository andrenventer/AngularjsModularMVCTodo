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
        }
    ]
};

server.listen(3000);
