import { action } from "@rbxts/vide";

export function tags(...tags: string[]) {
	return action((instance: Instance) => {
		for (const tag of tags) {
			instance.AddTag(tag);
		}
	});
}
