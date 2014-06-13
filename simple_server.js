var zmq = require('zmq');

var publisher = zmq.socket('pub');

// create folder to test  "/tmp/process-manager/1a"
// and files named 1, 3, 12, 55
var processes = [
	{
		id: '1a',
		pids: ['1', '3', '12', '55']
	}
];

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
	publisher.send(JSON.stringify(processes));
}, 10000);
