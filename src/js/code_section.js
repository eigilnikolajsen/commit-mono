const codeForm = document.querySelector("#code_form")
const codeFieldset = document.querySelector("#code_form fieldset")

websiteData.sections.forEach((section) => {
	if (section.name == "code") {
		section.content.characters.forEach((character, index) => {
			const div = document.createElement("div")
			const input = document.createElement("input")
			input.type = "radio"
			input.name = "nav"
			input.id = character.name
			input.classList.add("code_character")
			input.value = character.name
			if (index == 0) input.setAttribute("checked", "true")
			const label = document.createElement("label")
			label.for = character.value
			label.textContent = character.value
			label.classList.add("nav_element")
			label.dataset.sectionIndex = index + 1
			label.setAttribute("for", character.name)
			div.append(input, label)
			codeFieldset.append(div)
		})
	}
})

function updateCode(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}

	// initialize canvas
	let CANVAS_SCALE = window.devicePixelRatio
	const canvas = document.querySelector("#canvas")
	let canvasWidth = 60 * rem
	let canvasHeight = 42 * rem
	canvas.style.width = `${canvasWidth}px`
	canvas.style.height = `${canvasHeight}px`
	canvas.width = canvasWidth * CANVAS_SCALE
	canvas.height = canvasHeight * CANVAS_SCALE
	const ctx = canvas.getContext("2d")
	ctx.scale(CANVAS_SCALE, CANVAS_SCALE)

	let displayCharacter = ""
	websiteData.sections.forEach((section) => {
		if (section.name == "code") {
			section.content.characters.forEach((character, index) => {
				if (character.name == output) displayCharacter = character.value
			})
		}
	})

	ctx.font = `40rem CommitMono`
	ctx.fillText(displayCharacter, 0, 34 * rem)

	if (event) event.preventDefault()
}

updateCode(null, codeForm)
