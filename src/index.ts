export default {
    parserPreset: {
      parserOpts: {
        headerPattern: /(^[A-Z]{1,10}-[0-9]{1,5})[!]?:\s(.*)$/,
        headerCorrespondence: ["reference", "subject"],
        issuePrefixes: ["^CIRCLEDOT-"]
      }
    },
	rules: {
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
        'references-empty': [2, 'never'],
        'type-empty': [0, 'never'],
        'scope-empty': [0, 'never'],
	},
	prompt: {
		questions: {
			reference: {
				description: 'Add issue references (e.g. "fix #123", "re #123".)',
			},
			subject: {
				description:
					'Write a short, imperative tense description of the change',
			},
			isBreaking: {
				description: 'Are there any breaking changes?',
			},
		},
	},
};
