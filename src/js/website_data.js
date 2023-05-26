const websiteData = {
	pushPage: {
		coordinates: { x: 0, y: 0 },
		scale: 1,
		distance: 4, // in rem
		scaleOffset: 1.25,
	},
	sections: [
		{
			name: "home",
			description: null,
			content: {},
		},
		{
			name: "concept",
			description:
				"The most effective font is the one you don't notice. Designed to be normal and anonymous, Commit Mono is quietly useful and effective.",
			content: {},
		},
		{
			name: "familiar",
			description:
				"All research suggests the most familiar fonts are the ones you read fastest and most precisely. Commit Mono is inspired by fonts tested by time.",
			content: {
				timeline: [
					{
						name: "franklin_gothic",
						src: "franklin_gothic.svg",
						description: ["Fig. 3b: Franklin Gothic.", "Tried-and-true, but overly traditional for code."],
					},
					{
						name: "letter_gothic",
						src: "letter_gothic.svg",
						description: ["Fig. 3b: Letter Gothic.", "Clear, simple and monospaced, but too quirky."],
					},
					{
						name: "fira_mono",
						src: "fira_mono.svg",
						description: ["Fig. 3b: Fira Mono.", "Great letter distinction, but overly complex and unique."],
					},
					{
						name: "untitled_sans",
						src: "untitled_sans.svg",
						description: ["Fig. 3b: Untitled Sans.", "Intentionally neutral, but not optimised for code."],
					},
					{
						name: "commit_mono",
						src: "commit_mono.svg",
						description: ["Fig. 3b: Commit Mono.", "Neutral and functional, created and tested for code."],
					},
				],
			},
		},
		{
			name: "standard",
			description:
				"No super high x-height, no geometric construction, no eye-catching design and no confusing ligatures. Commit Mono delivers clarity and efficiency.",
			content: {},
		},
		{
			name: "code",
			description:
				"Commit Mono is designed and tested for code first. Characters frequently used in code have been given extra care to look distinct and neat.",
			content: {},
		},
		{
			name: "distinction",
			description:
				"With simple letter constructions Commit Mono emphasises character distinction without compromising style consistency.",
			content: {},
		},
		{
			name: "features",
			description:
				"Commit Mono comes without coding ligatures by default. However, it comes with a few helpful features to enhance reading.",
			content: {},
		},
		{
			name: "examples",
			description: "So, how does it look in code? Use the examples below or change the text to anything you like.",
			content: {},
		},
		{
			name: "download",
			description:
				"Generate static font files with your alternates baked in for ease of use in all editors and terminals.",
			content: {},
		},
		{
			name: "about",
			description:
				"Commit Mono is a project by Eigil Nikolajsen. Eigil is a creative developer and designer with a particular interest in type design. He holds a bachelor degree in Interactive Design from the Danish School of Media and Journalism in 2023.",
			content: {},
		},
	],
}
