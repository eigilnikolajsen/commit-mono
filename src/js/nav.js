const nav = document.querySelector("nav")

websiteData.sections.forEach((section, index) => {
	const a = document.createElement("a")
	a.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
	nav.append(a)
})

function capitalize(string) {
	const stringArray = string.split("")
	return stringArray.shift().toUpperCase() + stringArray.join("")
}
