import { Server } from "socket.io";
// import { createServer } from "https";

export default async function main(): Promise<void> {
	//const httpServer = createServer()
	const io = new Server({
		cors: {
			origin: "*"
		}
	});

	io.on("connection", (socket) => {
		console.log("a user connected");

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
		socket.on("scroll", (data) => {
			socket.broadcast.emit("scroll", data.scrollTop);
			console.log("SCROLLL", data);
		});
		socket.on("joinRoom", (data) => {
			console.log("JOIN ROOM", data);
			socket.join(data.roomId);
			socket.emit("joinRoom", {
				text: `Meantime we shall express our darker purpose.
				Give me the map there. Know that we have divided
				In three our kingdom: and 'tis our fast intent
				To shake all cares and business from our age;
				Conferring them on younger strengths, while we
				Unburthen'd crawl toward death. Our son of Cornwall,
				And you, our no less loving son of Albany,
				We have this hour a constant will to publish
				Our daughters' several dowers, that future strife
				May be prevented now. The princes, France and Burgundy,
				Great rivals in our youngest daughter's love,
				Long in our court have made their amorous sojourn,
				And here are to be answer'd. Tell me, my daughters,--
				Since now we will divest us both of rule,
				Interest of territory, cares of state,--
				Which of you shall we say doth love us most?
				That we our largest bounty may extend
				Where nature doth with merit challenge. Goneril,
				Our eldest-born, speak first.`
			});
		});
	});

	io.listen(4200);
	console.log("Server is running on port 420 #blazeit");
}

main();
