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
			io.emit('scroll', data.scrollTop);
			console.log('SCROLLL', data);
		})
	});

	
	

	io.listen(420);
	console.log("Server is running on port 420 #blazeit");
}

main();
