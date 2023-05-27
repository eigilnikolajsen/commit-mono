const exampleForm = document.querySelector("#examples_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")

websiteData.sections.forEach((section) => {
	if (section.name == "examples") {
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
			label.for = language.languageName
			label.textContent = language.languageName
			label.classList.add("nav_element")
			label.dataset.sectionIndex = index + 1
			label.setAttribute("for", language.languageName)
			div.append(input, label)
			exampleFieldset.append(div)
		})
	}
})

function updateExamples(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}

	const codeExample = document.querySelector("#code_example")
	websiteData.sections.forEach((section) => {
		if (section.name == "examples") {
			section.content.languages.forEach((language, index) => {
				if (language.languageName == output) {
					codeExample.textContent = language.codeExample
				}
			})
		}
	})

	if (event) event.preventDefault()
}

updateExamples(null, exampleForm)
