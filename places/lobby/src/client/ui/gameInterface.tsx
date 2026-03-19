import Vide from "@rbxts/vide";

import { Environment, environment } from "@common/env";
import { WatermarkApp } from "@common/ui/apps/watermark";

import { BlinkApp } from "./apps/blink";

export function GameInterface() {
	return (
		<screengui
			Name="GameInterface"
			ResetOnSpawn={false}
			IgnoreGuiInset={true}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<BlinkApp />
			{environment !== Environment.prod ? <WatermarkApp /> : undefined}
		</screengui>
	);
}
