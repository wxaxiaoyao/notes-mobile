
class UniWebsocket {
	constructor(url, protocols) {
		const socketTask = uni.connectSocket({
			url, protocols,
			fail: e => console.log(e),
			success: e => {},
		});

		const send = data => {
			//console.log("----send data---:", data, typeof(data));
			socketTask.send({data, fail: e => console.log(e),});
		}

		const onclose = (e) => {
			//console.log("----------on close------------", e);
			websocket.onclose && websocket.onclose();
		};

		const onopen = () => {
			//console.log("----------on open------------");
			websocket.onopen && websocket.onopen();
		}

		const onmessage = (data) => {
			//console.log("------------on message-----------", data.data);
			websocket.onmessage && websocket.onmessage(data);
		}

		const onerror = (e) => {
			//console.log("------------on error-----------", e);
			websocket.onerror && websocket.onerror(e);
		}

		//uni.onSocketClose(onclose);
		//uni.onSocketOpen(onopen);
		//uni.onSocketMessage(onmessage);
		//uni.onSocketError(onerror);

		socketTask.onClose(onclose);
		socketTask.onOpen(onopen);
		socketTask.onMessage(onmessage);
		socketTask.onError(onerror);

		const websocket = {
			url,
			send: data => send(data),
			close:(code, reason) => socketTask.close({code, reason}), 
		};

		return websocket;
	}
}

module.exports = UniWebsocket;

