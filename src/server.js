
const express = require("express"),
    app = express(),
    path = require("path"),
    http = require('http').createServer(app),
    io = require('socket.io')(http);

run();

function run() {

    app.set('view engine', 'pug');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE, PUT, POST");
        next();
    });

    app.get('/', (req, res) => {
        res.render(path.join(__dirname, "/dist", "index.pug"));
    });

    io.on('connection', socket => {
        socket.on('chat message', msg => {
            io.emit('chat message', msg);
        });
    });

    const PORT = process.env.PORT || 4000;

    http.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}
