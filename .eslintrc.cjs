const config = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/strict",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		project: "./tsconfig.eslint.json",
		sourceType: "module",
		tsconfigRootDir: __dirname,
	},
	plugins: ["@typescript-eslint"],
	root: true,
	rules: {},
}

module.exports = config
