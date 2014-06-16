var fs = require('fs');
var zmq = require('zmq');
var _ = require('underscore');
var argv = require('optimist')
.default({
	connect: "tcp://localhost:5557",
	tmpFolder: "/tmp/process-manager/"
}).argv;

var subscriber = zmq.socket('sub');

subscriber.on('message', function(msg) {
	var processes = JSON.parse(msg.toString());
	console.log(processes);
	removeProcess(processes);
});

subscriber.connect(argv.connect);
subscriber.subscribe('');
console.log('listening on ' + argv.connect);

removeProcess = function(processes) {
	var mainDir = argv.tmpFolder;

	var removePid = function(folder, pid) {
		fs.unlink(mainDir + folder + '/' + pid, function(error) {
			if(error) {
				console.log(error);
			}
			else {
				console.log('pid ' + pid + ' removed');
			}
		});	
	};

	_.each(processes, function(process) {
		_.each(process.pids, function(pid) {
			removePid(process.id, pid);
		});
	});
	
};
