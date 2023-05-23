websiteData.sections.forEach((section, index) => {
	const topContainer = document.querySelector(`#section_${index + 1} .top_container`)
	if (topContainer) {
		const h1 = document.createElement("h1")
		h1.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
		const br = document.createElement("br")
		const p = document.createElement("p")
		p.textContent = section.description
		topContainer.append(h1, br, p)
	}
})
