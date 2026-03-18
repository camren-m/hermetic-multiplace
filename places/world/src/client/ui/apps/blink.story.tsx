import { CreateVideStory } from "@rbxts/ui-labs";
import Vide, { cleanup, effect } from "@rbxts/vide";

import { blink, BlinkApp } from "./blink";

export = CreateVideStory(
	{
		summary: "The simple blink UI that can help hide hard transitions.",
		vide: Vide,
		controls: {
			duration: 0.5,
			color: new Color3(1, 1, 1),
		},
	},
	(props) => {
		effect(() => {
			props.controls.color();
			props.controls.duration();
			cleanup(
				task.delay(0.25, () => {
					blink(props.controls.color(), props.controls.duration());
				}),
			);
		});

		return <BlinkApp />;
	},
);
