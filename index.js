const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;

//Hacks for the kontran inside the server
global.performance = require('perf_hooks').performance;
global.requestAnimationFrame = setImmediate;
global.document = {
  getElementById: () => null,
  createElement: () => { return {getContext: () => null }}
}

const port = process.env.PORT || 2567;
const app = express()

app.use(cors());
app.use(express.json());

//Client side stuff
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('assets'));
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.render('./dist/index.html')
})

//Colyseus server
const server = http.createServer(app);
const gameServer = new colyseus.Server({
  server: server,
  express: app,
});

// Register the room
const SpaceRoom = require('./server/Rooms/SpaceRoom').SpaceRoom;
gameServer.define('room', SpaceRoom);
app.use("/colyseus", monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`);
console.log(`Playing on http://localhost:${ port }`);