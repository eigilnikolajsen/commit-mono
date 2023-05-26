function updateIntelligent(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}
	const examples = ["original", "smart_kerning", "before", "after"]
	examples.forEach((example) => {
		const exampleContainer = document.querySelector(`#${example}`)
		console.log(exampleContainer)
		if (exampleContainer.id == output) {
			exampleContainer.style.display = "block"
		} else {
			exampleContainer.style.display = "none"
		}
	})
	event.preventDefault()
}