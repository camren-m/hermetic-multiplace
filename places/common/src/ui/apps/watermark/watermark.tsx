import Vide from "@rbxts/vide";

import { releaseInfo } from "@common/env";
import { tags } from "@common/ui/actions/tags";
import { useStylesheet } from "@common/ui/hooks";

export function WatermarkApp() {
	const styles = useStylesheet(script);

	return (
		<frame Name="Watermark">
			{tags("WatermarkAppRoot")}
			<stylelink StyleSheet={styles} />
			<textlabel Text={`v${releaseInfo.number}: ${releaseInfo.name}`} />
		</frame>
	);
}
