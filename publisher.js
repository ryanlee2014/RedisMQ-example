const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({host: "127.0.0.1", port: 6379, ns: "rsmq", realtime: true});
(async() => {
	//await rsmq.deleteQueueAsync({qname: "myqueue"});
	try {
		await rsmq.createQueueAsync({qname: "myqueue"});
	}
	catch (e) {
		console.log("queue has created");
	}
	setInterval(() => {
		rsmq.sendMessageAsync({qname: "myqueue", message: JSON.stringify(new Date())})
			.then((resp) => {
				if (resp) {
					console.log(`Message sent. ID:${resp}`);
				}
			});
	}, 1000);
})();