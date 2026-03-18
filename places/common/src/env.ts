export enum Environment {
	prod = "prod",
	staging = "staging",
	dev = "dev",
}

import { $env, $NODE_ENV } from "rbxts-transform-env";

export const environment: Environment = Environment[$NODE_ENV as keyof typeof Environment] ?? Environment.prod;
export const releaseInfo = {
	number: $env.string("RELEASE_NUMBER", "unknown.0"),
	name: $env.string("RELEASE_NAME", "unknown release"),
};
