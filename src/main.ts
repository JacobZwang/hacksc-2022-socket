import { Server } from "socket.io";
// import { createServer } from "https";

export default async function main(): Promise<void> {
	//const httpServer = createServer()
	const io = new Server({
		cors: {
			origin: "*",
		}
	});
	
	io.on('connection', (socket) => {
		console.log("a user connected");

		socket.on('disconnect', () => {
			console.log("user disconnected");
		})
		socket.on('scroll', (data) => {
			
			socket.broadcast.emit('scroll', data.scrollTop);
			console.log('SCROLLL', data);
		})
		socket.on('joinRoom', (data) => {
			console.log('JOIN ROOM', data);
			socket.join(data.roomId);
			socket.emit('joinRoom', data);
			
		})
	});

	
	

	io.listen(420);
	console.log("Server is running on port 420 #blazeit");
}

main();
