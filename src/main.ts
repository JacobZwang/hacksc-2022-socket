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
	"presentation": [
		{
			Type: ScriptType.Character,
			Text: "Jason"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "Hi, I'm Jason!"
		}, {
			Type: ScriptType.Character,
			Text: "Ben"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "And I'm Ben!"
		},
		{
			Type: ScriptType.Character,
			Text: "Jason"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "When our team started brainstorming for HackSC, we discussed past hackathons, and realized that presentations were a real pain in the patooty for all of us."
		}, {
			Type: ScriptType.Character,
			Text: "Ben"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "Without much time for practice, and without much sleep, they were rough and disorganized — it was easy to lose track of what was going on."
		},
		{
			Type: ScriptType.Character,
			Text: "Jason"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "We wanted a new way to organize our presentations, keeping us in sync and allowing for more fluid transitions."
		}, {
			Type: ScriptType.Character,
			Text: "Ben"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "Our first thought was to treat the website as a prompter, but we realized that forcing the user into a preset speed didn’t always work. Some sentences should be emphasized more, and some just brushed over."
		},{
			Type: ScriptType.Character,
			Text: "Jason"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "We went through many different stages of development, and through the process, we noticed that this tool could be used for more than just hackathons. I had done theater in the past, and remembered how challenging the first several read throughs could be. This would not only smooth over that process, but would allow for more fluid acting, as the script would scroll in sync for all of us. Hence the name Scriptus."
		}, {
			Type: ScriptType.Character,
			Text: "Ben"
		},
		{
			Type: ScriptType.Dialogue,
			Text: "And here’s Jacob to give a more in-depth explanation of how it works."
		},
	],
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
