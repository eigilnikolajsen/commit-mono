// takes a string and returns a string, where the first letter is uppercase
function capitalize(string) {
	const stringArray = string.split("")
	return stringArray.shift().toUpperCase() + stringArray.join("")
}

const mapRange = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

const getCssVar = (property) => getComputedStyle(document.documentElement).getPropertyValue(property)
const setCssVar = ([property, value]) => document.documentElement.style.setProperty(property, value)

const isMobileTest = () => {
	if (window.matchMedia("(pointer: coarse) and (max-width: 1000px").matches) {
		console.log("(pointer: coarse) and (max-width: 1000px)")
		return true
	} else return false
}

const mobileMediaQuery = "(pointer: coarse) and (max-width: 1000px)"
const mql = window.matchMedia(mobileMediaQuery)
let isMobile = mql.matches
mql.addEventListener("change", (e) => {
	isMobile = e.matches
	changedFocus(true)
})

function wait(milliseconds) {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds)
	})
}

function appendStyleSheets() {
	const stylesheetIndexes = [2, 3, 4, 5, 6, 7, 8, 9]
	const head = document.querySelector("head")
	stylesheetIndexes.forEach((stylesheet) => {
		const link = document.createElement("link")
		link.setAttribute("rel", "stylesheet")
		link.setAttribute("href", `src/css/section_${stylesheet}.css`)
		head.append(link)
	})
}
appendStyleSheets()
