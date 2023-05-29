const exampleForm = document.querySelector("#examples_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")
const fontsFieldset = document.querySelector("#fonts")

websiteData.sections.forEach((section) => {
	if (section.name == "test") {
		section.content.languages.forEach((language, index) => {
			const div = document.createElement("div")
			const input = document.createElement("input")
			input.type = "radio"
			input.name = "nav"
			input.id = language.languageName
			input.classList.add("example_language")
			input.value = language.languageName
			if (index == 0) input.setAttribute("checked", "true")
			const label = document.createElement("label")
			label.textContent = language.languageName
			label.setAttribute("for", language.languageName)
			div.append(input, label)
			exampleFieldset.append(div)
		})

		section.content.fonts.forEach((font, index) => {
			const div = document.createElement("div")
			const input = document.createElement("input")
			input.type = "radio"
			input.name = "nav"
			input.id = font.id
			input.classList.add("example_font")
			input.value = font.id
			if (index == 0) input.setAttribute("checked", "true")
			const label = document.createElement("label")
			label.textContent = font.name
			label.setAttribute("for", font.id)
			div.append(input, label)
			fontsFieldset.append(div)
		})
	}
})

const codeExample = document.querySelector("#code_example")
function updateExamples(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}

	websiteData.sections.forEach((section) => {
		if (section.name == "test") {
			section.content.languages.forEach((language, index) => {
				if (language.languageName == output) {
					codeExample.textContent = language.codeExample
					let nums = Array.from(new Array(1000), (x, i) => i + 1).join("\n")
					codeExample.setAttribute("data-before", nums)
				}
			})
		}
	})

	if (event) event.preventDefault()
}

function updateExampleSettings(event, form) {
	const data = new FormData(form)
	let output = ""
	let font = ""
	for (const entry of data) {
		if (entry[0] != "nav") output += `${entry[1]}, `
		else font = entry[1]
	}
	console.log(output, font)

	const codeExample = document.querySelector("#code_example")
	codeExample.style.fontFeatureSettings = output.slice(0, -2)

	if (event) event.preventDefault()
}

updateExamples(null, exampleForm)
