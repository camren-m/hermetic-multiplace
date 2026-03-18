import Vide from "@rbxts/vide";

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
		</screengui>
	);
}
