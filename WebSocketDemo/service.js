let app = require('express')();
let server = require('http').Server(app);
let WebSocket = require('ws');


let wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', function connection(ws) {
    console.log('server: receive connection.');
    
    ws.on('message', function incoming(message) {
        console.log('server: received %s', message);
        ws.send('server: reply');
    });

    ws.on('pong', () => {
        console.log('server: received pong from client');
    });


    ws.send('world');
    
    // setInterval(() => {
    //     ws.ping('', false, true);
    // }, 2000);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000);