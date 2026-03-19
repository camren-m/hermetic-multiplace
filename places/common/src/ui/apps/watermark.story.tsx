import { CreateVideStory } from "@rbxts/ui-labs";
import Vide from "@rbxts/vide";

import { WatermarkApp } from "./watermark";

export = CreateVideStory(
	{
		summary: "A watermark for staging & dev environment",
		vide: Vide,
		controls: {},
	},
	() => {
		return <WatermarkApp />;
	},
);
