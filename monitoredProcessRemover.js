var fs = require('fs');
var zmq = require('zmq');

var subscriber = zmq.socket('sub');

subscriber.on('message', function(msg) {
	var result = JSON.parse(msg.toString());
	console.log(result);
});

subscriber.connect('tcp://localhost:5557');
subscriber.subscribe('');
console.log('listening on port: 5557');
