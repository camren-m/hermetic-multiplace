import { env, orchestraConfig, script, semverString } from "rbxts-orchestra";
import packageDef from "package.json"

export default orchestraConfig({
	releaseNumber: semverString(packageDef.version, ["staging"], ["dev"]),
	releaseName: "some assembly required",
	environments: {
		prod: { nodeEnv: "prod" },
		staging: { nodeEnv: "staging" },
		dev: { default: true },
	},
	scripts: {
		prepare: script("./scripts/prepare.sh"),
		upload: script("./scripts/upload.sh"),
		lint: script("./scripts/lint.sh", {
			ignoreNonZeroExitCode: true,
		}),
		clean: script("./scripts/clean.sh"),
	},
	places: [
		{
			rootDir: "places/lobby",
			experienceId: env({
				prod: 89746346109474,
				staging: 97047225573202,
				dev: 114434262958823,
			}),
			placeId: 1,
			scripts: {
				build: script("./scripts/build.sh"),
				dev: script("./scripts/dev.sh", {
					waitForExit: false,
				}),
				publish: script("./scripts/publish.sh"),
			},
		},
		{
			rootDir: "places/world",
			experienceId: env({
				prod: 121024703217835,
				staging: 81929958800191,
				dev: 115999976644452,
			}),
			placeId: 1,
			scripts: {
				build: script("./scripts/build.sh"),
				publish: script("./scripts/publish.sh"),
				dev: script("./scripts/dev.sh", {
					waitForExit: false,
				}),
			},
		},
	],
});
