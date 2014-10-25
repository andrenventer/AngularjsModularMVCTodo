var server = require('json-server');

server.low.db = {
    "todos": [
        {
            title: One,
            completed: false
        },
        {
            title: Two,
            completed: false
        },
        {
            title: Three,
            completed: false
        }
    ]
};

server.listen(3000);
