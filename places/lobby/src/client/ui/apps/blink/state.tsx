import { atom, Atom, batch } from "@rbxts/charm";

interface BlinkState {
	color: Atom<Color3>;
	active: Atom<boolean>;
}

export const blinkState: BlinkState = {
	color: atom(Color3.fromHex("#FFF")),
	active: atom(false),
};

export function blink(color: Color3, duration = 0.5) {
	batch(() => {
		blinkState.color(color);
		blinkState.active(true);
	});
	task.delay(duration, () => {
		blinkState.active(false);
	});
}
