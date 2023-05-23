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

let currentSection = 1

window.addEventListener("keydown", (e) => {
	if (currentSection == 1) {
		const activeKey = document.querySelector(`.key[data-key-code="${e.code}"]`)
		activeKey?.classList.add("active_key")
	}

	if (
		e.code == "KeyW" ||
		e.code == "KeyA" ||
		e.code == "KeyS" ||
		e.code == "KeyD" ||
		e.code == "KeyR" ||
		e.code == "Minus" ||
		e.code == "Slash"
	) {
		main.style.opacity = 0.02
		pushPage(e.code)
	}
})

const main = document.querySelector("main")
const mainScale = document.querySelector("#main_scale")
const rem = getComputedStyle(document.documentElement).fontSize.split("px")[0]
window.addEventListener("keyup", (e) => {
	console.log(`keyup: ${e.code}`)
	if (currentSection == 1) {
		const activeKey = document.querySelector(`.key[data-key-code="${e.code}"]`)
		activeKey?.classList.remove("active_key")
	}
	if (e.code.includes("Digit")) {
		sectionNavigation(e.code.split("Digit")[1])
	}
	main.style.opacity = 1
})

function pushPage(keyCode) {
	const x = websiteData.pushPage.coordinates.x
	const y = websiteData.pushPage.coordinates.y
	const scale = websiteData.pushPage.scale
	const dist = (websiteData.pushPage.distance * rem) / scale
	const scaleOffset = websiteData.pushPage.scaleOffset

	// move left
	if (keyCode == "KeyW") {
		main.style.transform = `translate(${x}px, ${y + dist}px)`
		websiteData.pushPage.coordinates.y += dist
	}

	// move left
	else if (keyCode == "KeyA") {
		main.style.transform = `translate(${x + dist}px, ${y}px)`
		websiteData.pushPage.coordinates.x += dist
	}

	// move down
	else if (keyCode == "KeyS") {
		main.style.transform = `translate(${x}px, ${y - dist}px)`
		websiteData.pushPage.coordinates.y -= dist
	}

	// move right
	else if (keyCode == "KeyD") {
		main.style.transform = `translate(${x - dist}px, ${y}px)`
		websiteData.pushPage.coordinates.x -= dist
	}

	// zoom in ("Minus" is the plus key, very confusing)
	else if (keyCode == "Minus") {
		mainScale.style.transform = `scale(${scale * scaleOffset})`
		websiteData.pushPage.scale *= scaleOffset
	}

	// zoom out
	else if (keyCode == "Slash") {
		mainScale.style.transform = `scale(${scale / scaleOffset})`
		websiteData.pushPage.scale /= scaleOffset
	}

	// reset transforms
	else if (keyCode == "KeyR") {
		main.style.transform = `translate(0px, 0px)`
		mainScale.style.transform = `scale(1)`
		websiteData.pushPage.coordinates.x = 0
		websiteData.pushPage.coordinates.y = 0
		websiteData.pushPage.scale = 1
	}
}

let active
document.addEventListener("focusin", (e) => {
	active = document.activeElement
	if (active.classList.contains("nav_element")) {
		sectionNavigation(active.dataset.sectionIndex)
	}
})

function sectionNavigation(num) {
	const activeSection = document.querySelector(`#section_${num}`)
	if (activeSection) {
		const sections = document.querySelectorAll("#section_container section")
		sections.forEach((section) => (section.style.visibility = "hidden"))
		activeSection.style.visibility = "visible"
	}
}
