const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const chokidar = require('chokidar');

const PORT = process.env.PORT || 5000;

const readFile = () => fs.readFileSync('./test.json', 'utf-8');

io.on('connection', socket => {
	io.emit('message', readFile());

	socket.on('message', msg => {
		io.emit('message', msg);
	});
});

server.listen(PORT);

app.get('*', () => {
	io.emit('message', readFile());
});

chokidar.watch('./test.json').on('all', () => {
	io.emit('message', readFile());
});
