var zmq = require('zmq');

var publisher = zmq.socket('pub');

publisher.bind('tcp://*:5557', function(error) {
	if(error) {
		console.log(error);
		process.exit(0);
	}
	else {
		console.log('Binding on port: 5557');
	}
});

setInterval(function() {
	publisher.send(JSON.stringify({msg: 'hello !'}));
}, 10000);
