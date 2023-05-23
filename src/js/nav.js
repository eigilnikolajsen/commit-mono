const nav = document.querySelector("nav")

websiteData.sections.forEach((section, index) => {
	const a = document.createElement("a")
	a.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
	a.tabIndex = 1000 + index
	a.classList.add("nav_element")
	a.dataset.sectionIndex = index + 1
	a.addEventListener("click", (e) => {
		console.log(e)
	})
	nav.append(a)
})

window.addEventListener("keydown", (e) => {
	const activeKey = document.querySelector(`.key[data-key-code="${e.code}"]`)
	if (activeKey) activeKey.classList.add("active_key")
})

window.addEventListener("keyup", (e) => {
	console.log(`keyup: ${e.code}`)
	if (e.code == "Enter") {
		if (document.activeElement) {
			console.log(document.activeElement)
		}
	}
	const activeKey = document.querySelector(`.key[data-key-code="${e.code}"]`)
	if (activeKey) activeKey.classList.remove("active_key")
})

let active
document.addEventListener("focusin", (e) => {
	active = document.activeElement
	if (active.classList.contains("nav_element")) {
		const sections = document.querySelectorAll("#section_container section")
		sections.forEach((section) => (section.style.visibility = "hidden"))
		const activeSection = document.querySelector(`#section_${active.dataset.sectionIndex}`)
		activeSection.style.visibility = "visible"
	}
})
