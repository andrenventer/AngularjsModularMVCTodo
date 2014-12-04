var server = require('json-server');

server.low.db = {
    "todos": [
        {
            id: 0,
            title: "Eat",
            completed: false
        },
        {
            id: 1,
            title: "Sleep",
            completed: false
        },
        {
            id: 2,
            title: "Rave",
            completed: false
        },
        {
            id: 3,
            title: "Repeat",
            completed: false
        }
    ]
};

server.listen(3000);
