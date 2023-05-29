const familiarContainer = document.querySelector("#familiar_container")

let familiarContent
websiteData.sections.forEach((section) => {
	if (section.name == "familiar") familiarContent = section.content.timeline
})

familiarContent.forEach((example, index) => {
	const div = document.createElement("div")
	div.style.display = index != 0 ? "none" : "block"
	div.id = example.name
	div.dataset.name = example.name
	const img = document.createElement("img")
	img.src = `/src/img/familiar/${example.src}`
	example.description.forEach((description) => {
		const p = document.createElement("p")
		p.textContent = description
		p.tabIndex = 0
		p.dataset.edit = "true"
		div.append(p)
	})
	div.append(img)
	familiarContainer.append(div)
})

function updateFamiliar(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		// output = `${output}${entry[0]}=${entry[1]}\n`
		output = `${entry[1]}`
	}
	familiarContent.forEach((example) => {
		const exampleContainer = familiarContainer.querySelector(`#${example.name}`)
		if (exampleContainer.dataset.name == output) {
			exampleContainer.style.display = "block"
		} else {
			exampleContainer.style.display = "none"
		}
	})
	event.preventDefault()
}
