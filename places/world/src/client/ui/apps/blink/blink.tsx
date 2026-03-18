import Vide, { derive, spring } from "@rbxts/vide";

import { tags } from "@common/ui/actions/tags";
import { useStylesheet, useAtom } from "@common/ui/hooks";

import { blinkState } from "./state";

export function BlinkApp() {
	const color = useAtom(blinkState.color);
	const active = useAtom(blinkState.active);
	const styles = useStylesheet(script);
	const [transparency] = spring(derive(() => (active() ? 0 : 1)));

	return (
		<frame Name="Blink" BackgroundColor3={color} BackgroundTransparency={transparency}>
			{tags("BlinkAppRoot")}
			<stylelink StyleSheet={styles} />
		</frame>
	);
}
