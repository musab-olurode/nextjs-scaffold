// @ts-check

import { globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import unusedImports from 'eslint-plugin-unused-imports';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	importPlugin.flatConfigs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 12,
				sourceType: 'module',
				project: 'tsconfig.json',
			},
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': hooksPlugin,
			'unused-imports': unusedImports,
			'simple-import-sort': simpleImportSort,
			'@stylistic': stylistic,
			'@tanstack/query': tanstackQueryPlugin,
			'jsx-a11y': jsxA11yPlugin,
			'@next/next': nextPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		// @ts-ignore
		rules: {
			...reactPlugin.configs['jsx-runtime'].rules,
			...hooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': 'warn',
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: true,
					shorthandFirst: true,
					noSortAlphabetically: false,
					reservedFirst: true,
				},
			],
			'react-hooks/exhaustive-deps': 'off',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/interactive-supports-focus': 'warn',
			'prettier/prettier': 'warn',
			'no-unused-vars': 'off',
			'unused-imports/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'warn',
			'padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
				{
					blankLine: 'any',
					prev: ['const', 'let', 'var'],
					next: ['const', 'let', 'var'],
				},
			],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^react'], // React imports
						['^'], // Other imports (e.g., styles, images)
						['^@/hooks'], // Hooks
						['^@/components'], // Components
						['^@?\\w'], // Other node_modules
						['^\\.'], // Relative imports
					],
				},
			],
			'no-console': 'error',
			'no-implied-eval': 'error',
			'no-empty-function': 'error',
			'no-else-return': 'error',
			'no-await-in-loop': 'error',
			'no-duplicate-case': 'error',
			'no-inner-declarations': 'error',
			'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
			'no-trailing-spaces': 'error',
			'require-await': 'error',
			indent: 'off',
			'max-params': 'off',
			'no-shadow': 'off',
			'no-nested-ternary': 'error',
			'@stylistic/block-spacing': 'error',
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/array-type': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/explicit-member-accessibility': 'error',
			'@typescript-eslint/no-empty-function': 'error',
			'@typescript-eslint/no-loop-func': 'error',
			'@typescript-eslint/no-array-constructor': 'error',
			'@typescript-eslint/no-base-to-string': 'error',
			'@typescript-eslint/no-duplicate-enum-values': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-for-in-array': 'error',
			'@typescript-eslint/no-implied-eval': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/restrict-plus-operands': 'error',
			'@typescript-eslint/max-params': 'error',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'import/named': 'off',
			'import/no-unresolved': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
		},
	},
	eslintPluginPrettierRecommended,
	{
		rules: {
			'prettier/prettier': 'warn',
		},
	},
	globalIgnores(['**/*.js', '**/*.mjs']),
);
