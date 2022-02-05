import { Server } from "socket.io";
 export default async function main():Promise<void> {
	const io = new Server({
		cors: {
			origin: "*",
		}
	});
	io.on('connection', (socket) => {
		socket.send({
			type: 'message',
			data: 'Hello World'
		})
	});
	io.on('message', ()=>{
		return {
			message: 'Hello World'
		}
	})
	
	io.listen(420);
	console.log("Hello World!");
}

main();
