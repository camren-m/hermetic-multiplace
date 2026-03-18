import { subscribe } from "@rbxts/charm";
import { source, cleanup } from "@rbxts/vide";

/**
 * Subscribes to the state of an atom and returns a Vide source.
 *
 * *taken from [littensy's vide-charm](https://github.com/littensy/charm/blob/d0b7cff/packages/vide/src/init.luau)*
 *
 * @param callback  The atom or selector to subscribe to.
 * @returns The reactive source.
 */
export function useAtom<State>(callback: () => State): () => State {
	const state = source(callback());
	const unsubscribe = subscribe(callback, function (value) {
		task.spawn(state, value);
	});

	cleanup(unsubscribe);

	return state;
}
