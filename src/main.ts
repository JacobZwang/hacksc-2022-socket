import { Server } from "socket.io";
import { ScriptPart, ScriptType } from "../schema/script";
// import { createServer } from "https";
const scripts: Record<string, ScriptPart[]> = {
	"x": [
		{
			Type: ScriptType["Scene Heading"],
			Text: "INT. REBEL BLOCKADE RUNNER - MAIN PASSAGEWAY"
		},
		{
			Type: ScriptType.Action,
			Text: "An explosion rocks the ship as two robots, Artoo-Detoo (R2-D2) and See-Threepio (C-3PO) struggle to make their way through the shaking, bouncing passageway. Both robots are old and battered. Artoo is a short, claw-armed tripod. His face is a mass of computer lights surrounding a radar eye. Threepio, on the other hand, is a tall, slender robot of human proportions. He has a gleaming bronze-like metallic surface of an Art Deco design."
		},
		{
			Type: ScriptType.Action,
			Text: "Another blast shakes them as they struggle along their way."
		},
		{
			Type: ScriptType.Character,
			Text: "THREEPIO"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness!"
		},
		{
			Type: ScriptType.Action,
			Text: "Rebel troopers rush past the robots and take up positions in the main passageway. They aim their weapons toward the door."
		}
	],
	"hamlet": [],
	"presentation": [],
}
export default async function main(): Promise<void> {
	//const httpServer = createServer()
	const io = new Server({
		cors: {
			origin: "*"
		}
	});
	io.on("connection", (socket) => {
		console.log("a user connected");

		socket.on("post", (data) => {
			scripts[data.scene] = (data.script as []).filter((script) => {
				return typeof script["Text"] == 'string';
			}).map((script) => {
				let typeId;

				switch (script['Type']) {

					case "Action":
						typeId = 0;
						break;
					case "Character":
						typeId = 1;
						break;
					case "Dialogue":
						typeId = 2;
						break;
					case "Scene Heading":
						typeId = 3;
						break;
					case "Parenthetical":
						typeId = 4;
						break
					default:
						typeId = 2;
				}
				return {
					Type: typeId,
					Text: script["Text"] as string
				}
			});
			console.log('SCRIPTS', scripts['script'], Object.keys(scripts));

		})
		socket.on("disconnect", () => {
			console.log("user disconnected");
		});


		socket.on("joinRoom", (data) => {
			console.log("JOIN ROOM", data);
			socket.join(data.roomId);
			socket.emit("joinRoom", {
				script: scripts[data.scriptId]
			});
		});

		socket.on("active-word", (data) => {
			console.log(data);
			socket.broadcast.to(data.roomId).emit("active-word", data.word);
			socket.broadcast.emit("active-word", data.word);
		});
	});

	io.listen(4200);
	console.log("Server is running on port 420 #blazeit");
}

main();
