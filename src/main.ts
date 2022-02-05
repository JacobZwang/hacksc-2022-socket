import { Server } from "socket.io";
import { createServer } from "https";

 export default async function main():Promise<void> {
	const httpServer = createServer()
	const io = new Server(httpServer,{
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
	
	httpServer.listen(420);
	console.log("Server is running on port 420 #blazeit");
}

main();
