import { env, orchestraConfig, script, semverString } from "rbxts-orchestra";

import packageDef from "./package.json";

// A shared EXPERIENCE_ID constant for use in all places' definitions
const EXPERIENCE_ID = env({
	prod: 9899262995,
	staging: 9899307252,
	dev: 9899298727,
});

// The configuration used by the orchestra
export default orchestraConfig({
	// Dynamically generated release number based on package.json version and
	// current environment
	releaseNumber: semverString(
		// package.json version
		packageDef.version,
		// Append +<commit-hash> in staging environment
		["staging"],
		// Append -<local-username> in dev environment
		["dev"],
	),
	// A human-friendly release codename
	releaseName: "assembly minimal, instability guaranteed",

	// A list of possible environments and situations in which they will be
	// chosen
	environments: {
		prod: { nodeEnv: "prod" },
		staging: { nodeEnv: "staging" },
		dev: { default: true },
	},

	// A list of top-level scripts that can be run with `npx orchestra run <script-name>`
	scripts: {
		// Special script that runs before other scripts (assuming they do not have skipPrepare set)
		prepare: script("./scripts/prepare.sh"),
		// Uploads .rbxl build artifacts to GitHub releases
		upload: script("./scripts/upload.sh"),
		// Lints the entire codebase using ESLint
		lint: script("./scripts/lint.sh"),
		// Cleans build artifacts. Use -f for a full clean, including dependencies.
		clean: script("./scripts/clean.sh", {
			skipPrepare: true,
		}),
	},

	// A list of place definitions that this orchestra manages, and information
	// or scripts regarding them
	places: [
		// The start place of this experience
		{
			// The working directory of scripts run in the context of this place
			rootDir: "places/lobby",
			// The Roblox experience (formerly known as universe) ID
			// associated with this place
			experienceId: EXPERIENCE_ID,
			// The Roblox place ID under experienceId associated with this
			// definition.
			placeId: env({
				prod: 89746346109474,
				staging: 97047225573202,
				dev: 114434262958823,
			}),

			// A list of place-level scripts that can be run with `npx orchestra run <script-name>`.
			// Scripts in this dictionary are run with `rootDir` as the current working directory.
			scripts: {
				// Builds RSML styles, TypeScript code, and outputs the .rbxl artifact to dist/
				build: script("./scripts/build.sh"),
				publish: script("./scripts/publish.sh"),
				dev: script("./scripts/dev.sh", {
					waitForExit: false,
				}),
			},
		},
		// A second place under the same experience, following the same format and logic as the lobby place.
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
