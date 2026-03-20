import { env, orchestraConfig, script, semverString } from "rbxts-orchestra";

const EXPERIENCE_ID = env({
	prod: 9899262995,
	staging: 9899307252,
	dev: 9899298727,
});

export default orchestraConfig({
	releaseNumber: semverString("0.2.0", ["staging"], ["dev"]),
	releaseName: "some assembly required",
	environments: {
		prod: { nodeEnv: "prod" },
		staging: { nodeEnv: "staging" },
		dev: { default: true },
	},
	scripts: {
		prepare: script("./scripts/prepare.sh"),
		upload: script("./scripts/upload.sh"),
		lint: script("./scripts/lint.sh"),
		clean: script("./scripts/clean.sh"),
	},
	places: [
		{
			rootDir: "places/lobby",
			experienceId: EXPERIENCE_ID,
			placeId: env({
				prod: 89746346109474,
				staging: 97047225573202,
				dev: 114434262958823,
			}),
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
			experienceId: EXPERIENCE_ID,
			placeId: env({
				prod: 121024703217835,
				staging: 81929958800191,
				dev: 115999976644452,
			}),
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
