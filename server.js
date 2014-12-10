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
            title: "Jump",
            completed: true
        },
        {
            id: 3,
            title: "Wave",
            completed: true
        },
        {
            id: 4,
            title: "Rave",
            completed: false
        },
        {
            id: 5,
            title: "Repeat",
            completed: false
        }
    ]
};

server.listen(3000);
