const exampleForm = document.querySelector("#examples_form")
const exampleSettingsForm = document.querySelector("#examplesettings_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")
const fontsFieldset = document.querySelector("#fonts")
const alternatesContainer = document.querySelector("#alternates_container")
const featuresContainer = document.querySelector("#features_container")

websiteData.sections.forEach((section) => {
	if (section.name == "customize") {
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
			input.name = "font"
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

		section.content.features.forEach((feature, index) => {
			const fieldset = document.createElement("fieldset")
			const duo = [0, 0]
			const p = document.createElement("p")
			p.textContent = feature.label
			p.id = `alt_${feature.name}`
			fieldset.append(p)
			duo.forEach((d, index) => {
				const div = document.createElement("div")
				const input = document.createElement("input")
				input.type = "radio"
				input.name = feature.name
				input.id = `${feature.name}${index}`
				input.value = `'${feature.feature}' ${index == 0 ? "off" : "on"}`
				if (!feature.on && index == 0) input.setAttribute("checked", "true")
				if (feature.on && index == 1) input.setAttribute("checked", "true")
				const label = document.createElement("label")
				label.textContent = index == 0 ? "OFF" : "ON"
				label.setAttribute("for", `${feature.name}${index}`)
				div.append(input, label)
				fieldset.append(div)
			})
			if (feature.type == "feature") featuresContainer.append(fieldset)
			else alternatesContainer.append(fieldset)
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
		if (section.name == "customize") {
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
		if (entry[0] != "font") output += `${entry[1]}, `
		else font = entry[1]
		// output += `${entry[0]}: ${entry[1]}\n`
		const label = document.querySelector(`#alt_${entry[0]}`)
		console.log(label, entry)
		if (label) label.style.fontFeatureSettings = entry[1]
	}
	console.log(output)

	const codeExample = document.querySelector("#code_example")
	codeExample.style.fontFeatureSettings = output.slice(0, -2)

	if (event) event.preventDefault()
}

updateExamples(null, exampleForm)
updateExampleSettings(null, exampleSettingsForm)
