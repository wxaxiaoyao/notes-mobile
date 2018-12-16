import io from "../libs/socket.io-client/index.js";

const sockets = {};

export default async (url, query = {}) => {
	sockets[url] = sockets[url] || {url, query, cbs:[]};

	return new Promise((resolve, reject) => {
		const socket = sockets[url];
		
		if (socket.socket) {
			if (socket.socket.connected) {
				return resolve(socket.socket);
			} else {
				socket.cbs.push(resolve);
			}
		} else {
		}

		if (socket.socket) return;

		socket.socket = io(url, {query, transports:["websocket"]});

		socket.socket.on("connect", e => {
			console.log("websocket connect successful")
			const cb = socket.cbs.pop();
			cb && cb(socket.socket);
		});

		socket.socket.on("disconnect", e => {
			console.log(e);
		});

		socket.socket.on("error", e => {
			console.log(e);
		});
	});
}

