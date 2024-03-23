import {test, expect} from 'vitest';
import path from 'path';
import {pathToFileURL} from 'url';

import lint from '@commitlint/lint';

import config from './index.js';

const {rules, parserPreset} = config;

const dynamicImport = async (id: string) => {
	const imported = await import(
		path.isAbsolute(id) ? pathToFileURL(id).toString() : id
	);
	return ('default' in imported && imported.default) || imported;
};

const commitLint = async (message: string) => {
	const preset = parserPreset;
	return lint(message, rules, {...preset});
};

const messages = {
	invalidIssueKey: 'CIRCLEDT-123: some message',
	validMessages: [
		'CIRCLEDOT-123: some message',
		'CIRCLEDOT-123: some message',
		'CIRCLEDOT-123: some Message',
		'CIRCLEDOT-123: some message\n\nBREAKING CHANGE: it will be significant!',
		'CIRCLEDOT-123: some message\n\nbody',
		'CIRCLEDOT-123!: some message\n\nbody',
	],
};

const errors = {
	invalidIssueKey: {
		level: 2,
		message: 'references may not be empty',
		name: 'references-empty',
		valid: false,
	},
};

const warnings = {
	footerLeadingBlank: {
		level: 1,
		message: 'footer must have leading blank line',
		name: 'footer-leading-blank',
		valid: false,
	},
};


test('invalid-issue-key', async () => {
	const result = await commitLint(messages.invalidIssueKey);
	expect(result.errors).toEqual([errors.invalidIssueKey]);
	expect(result.valid).toBe(false);
});


test('valid messages', async () => {
	const validInputs = await Promise.all(
		messages.validMessages.map((input) => commitLint(input))
	);

	validInputs.forEach((result) => {
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
		expect(result.warnings).toEqual([]);
	});
});
