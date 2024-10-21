/* eslint-disable n/no-unpublished-import */
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import configPrettier from 'eslint-config-prettier';
import pluginSecurity from 'eslint-plugin-security';
// eslint-disable-next-line import/no-unresolved
import tsEslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        rules: {
            semi: "error",
            "prefer-const": "error",
            "no-console": "off",
            camelcase: "warn",
        }
    },
    importPlugin.flatConfigs.recommended,
    ...tsEslint.configs.recommended,
    pluginSecurity.configs.recommended,
    promisePlugin.configs['flat/recommended'],
    js.configs.recommended,
    nodePlugin.configs['flat/recommended-script'],
    configPrettier,
];
