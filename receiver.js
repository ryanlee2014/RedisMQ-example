const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({host: "127.0.0.1", port: 6379, ns: "rsmq"});
const redis = require("redis");
const subscribe = redis.createClient(6379, "127.0.0.1");
subscribe.subscribe("rsmq:rt:myqueue");
subscribe.on("message", () => {
	rsmq.popMessageAsync({qname: "myqueue"}).then((resp) => {
		if (resp.id) {
			console.log(`Message received.`, resp);
		}
	});
});