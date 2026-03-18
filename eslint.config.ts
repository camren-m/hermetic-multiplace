import * as importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import roblox from "eslint-plugin-roblox-ts";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default [
	roblox.configs.recommended,
	...tseslint.configs.recommended,
	prettierPlugin,
	{
		rules: {
			"lines-between-class-members": [
				"warn",
				{
					enforce: [
						{ blankLine: "always", prev: "*", next: "*" },
						{ blankLine: "never", prev: "field", next: "field" },
					],
				},
			],

			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_|Vide" }],
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-empty-function": "warn",
			"@typescript-eslint/explicit-member-accessibility": [
				"warn",
				{
					overrides: {
						constructors: "no-public",
					},
				},
			],
			"@typescript-eslint/member-ordering": [
				"warn",
				{
					/**
					 * Orders static variables, then methods, then public variables, then protected, then private, then constructor, then public methods, protected methods, and finally private methods.
					 */
					default: [
						"static-field",
						"static-method",
						"public-field",
						"protected-field",
						"private-field",
						"constructor",
						"public-method",
						"protected-method",
						"private-method",
					],
				},
			],

			"roblox-ts/no-undeclared-scope": "off",
			"roblox-ts/lua-truthiness": "off",

			"import/order": [
				"warn",
				{
					groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
					pathGroups: [
						{
							pattern: "@rbxts/**",
							group: "external",
							position: "before",
						},
						{
							pattern: "@flamework/**",
							group: "external",
							position: "before",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
					"newlines-between": "always",
				},
			],
		},
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"unused-imports": unusedImportsPlugin,
			import: importPlugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			ecmaVersion: "latest",
			sourceType: "module",

			parserOptions: {
				jsx: true,
				useJSXTextNode: false,
			},
		},
	},
];
