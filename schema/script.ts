export enum ScriptType {
	"Action",
	"Character",
	"Dialogue",
	"Scene Heading",
	"Parenthetical"
}

export interface ScriptPart {
	Type: ScriptType;
	Text: string;
}
