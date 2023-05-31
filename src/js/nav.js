document.documentElement.style.fontSize = "16px"

const appRoot = document.querySelector("#app_root")
const contentRoot = document.querySelector("#content_root")
const clickFocus = document.querySelector("#click_focus")
const navForm = document.querySelector("#nav_form")
const changeSetting = document.querySelector("#change_setting p")

websiteData.sections.forEach((section, index) => {
	const div = document.createElement("div")
	const input = document.createElement("input")
	input.type = "radio"
	input.name = "nav"
	input.id = section.name
	input.classList.add("nav_section_input")
	input.value = `section_${index + 1}`
	if (index == 0) input.setAttribute("checked", "true")
	const label = document.createElement("label")
	label.for = section.name
	label.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
	label.classList.add("nav_element")
	label.dataset.sectionIndex = index + 1
	label.setAttribute("for", section.name)
	div.append(input, label)
	navForm.append(div)
	if (index == 0) {
		setTimeout(() => {
			input.focus()
		}, 1)
	}
})

function updateNav(event, form) {
	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${entry[1]}`
	}
	websiteData.sections.forEach((section, index) => {
		const sectionContainer = document.querySelector(`#section_${index + 1}`)
		if (sectionContainer.id == output) {
			sectionContainer.style.display = "block"
		} else {
			sectionContainer.style.display = "none"
		}
	})
	// reset transforms
	main.style.transform = `translate(0px, 0px)`
	mainScale.style.transform = `scale(1)`
	websiteData.pushPage.coordinates.x = 0
	websiteData.pushPage.coordinates.y = 0
	websiteData.pushPage.scale = 1

	if (event) event.preventDefault()
}

let currentSection = 1
let insideTextField = false
function enterTextField() {
	active = document.activeElement
	setTimeout(() => {
		active.setAttribute("contenteditable", "true")
		active.blur()
		active.focus()
	}, 40)
	insideTextField = true
}
function exitTextField() {
	document.activeElement.setAttribute("contenteditable", "false")
	insideTextField = false
}

const keys = document.querySelectorAll(".key")
keys.forEach((key) => {
	key.addEventListener("mousedown", () => {
		if (key.dataset.noclick != "true") {
			key.dataset.keyCode.includes("Shift")
				? keyDown({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: true })
				: keyDown({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: false })
		}
	})
	key.addEventListener("mouseup", () => {
		if (key.dataset.noclick != "true") {
			key.dataset.keyCode.includes("Shift")
				? keyUp({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: true })
				: keyUp({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: false })
		}
	})
})

let changeSettingTimeoutID
function keyDown(e) {
	// console.log(e, e.code, e.shiftKey, e.key)

	if (e.code == "KeyE" && document.activeElement.dataset.edit == "true" && !insideTextField) enterTextField()

	if (e.code == "Escape") exitTextField()

	if (!insideTextField) {
		// show keypress on frontpage
		const activeKey = !e.shiftKey
			? document.querySelector(`.key[data-key-code="${e.code}"]`)
			: document.querySelector(`.key[data-key-code="Shift${e.code}"]`)
		activeKey?.classList.add("active_key")

		// push page
		if (
			e.code == "KeyW" ||
			e.code == "KeyA" ||
			e.code == "KeyS" ||
			e.code == "KeyD" ||
			e.code == "KeyR" ||
			e.code == "Minus" ||
			e.code == "Slash"
		) {
			pushPage(e.code)
		}

		if (e.code == "KeyK") {
			document.querySelector("#keyboard_section").classList.toggle("hidden")
		}

		if (e.code == "KeyV") {
			websiteData.weight = websiteData.weight == 700 ? 300 : websiteData.weight + 25
			document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}`
			changeSetting.textContent = `Weight: ${websiteData.weight}. Default 450.`
			changeSetting.style.visibility = "visible"
			clearTimeout(changeSettingTimeoutID)
			changeSettingTimeoutID = setTimeout(() => (changeSetting.style.visibility = "hidden"), 500)
		}

		if (e.code == "KeyI") {
			if (websiteData.invert) {
				setCssVar(["--bg", "#aaa"])
				setCssVar(["--text", "#111"])
			} else {
				setCssVar(["--bg", "#111"])
				setCssVar(["--text", "#aaa"])
			}
			updateCode(null, codeForm)
			websiteData.invert = !websiteData.invert
		}
	}
}
function keyUp(e) {
	const activeKey = document.querySelector(".active_key")
	activeKey?.classList.remove("active_key")

	main.style.opacity = 1

	if (e.code == "Tab" && document.activeElement.id.includes("block_tab")) {
		console.log("active nav section then tab")
		const checkedMenuInput = document.querySelector("#nav_form input:checked")
		checkedMenuInput.focus()
	}
}

window.addEventListener("keydown", (e) => keyDown(e))
window.addEventListener("keyup", (e) => keyUp(e))

const main = document.querySelector("main")
const mainScale = document.querySelector("#main_scale")
const keySection = document.querySelector("#keyboard_section")
let rem = +document.documentElement.style.fontSize.split("px")[0]

function pushPage(keyCode) {
	const x = websiteData.pushPage.coordinates.x
	const y = websiteData.pushPage.coordinates.y
	const scale = websiteData.pushPage.scale
	const dist = websiteData.pushPage.distance

	// move left
	if (keyCode == "KeyW") {
		main.style.transform = `translate(${x}px, ${y + dist}px)`
		websiteData.pushPage.coordinates.y += dist
	}

	// move left
	else if (keyCode == "KeyA") {
		main.style.transform = `translate(${x + dist}px, ${y}px)`
		navForm.style.transform = `translate(${x + dist}px, ${y}px)`
		keySection.style.transform = `translate(${x + dist}px, ${y}px)`
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
		navForm.style.transform = `translate(${x - dist}px, ${y}px)`
		keySection.style.transform = `translate(${x - dist}px, ${y}px)`
		websiteData.pushPage.coordinates.x -= dist
	}

	// zoom in ("Minus" is the plus key, very confusing)
	else if (keyCode == "Minus") {
		document.documentElement.style.fontSize = `${rem + 2}px`
		rem = +rem + 2
		updateWaterfall()
		document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
		changeSetting.textContent = `Base font size: ${rem}px`
		changeSetting.style.visibility = "visible"
		clearTimeout(changeSettingTimeoutID)
		changeSettingTimeoutID = setTimeout(() => (changeSetting.style.visibility = "hidden"), 500)
	}

	// zoom out
	else if (keyCode == "Slash") {
		document.documentElement.style.fontSize = `${rem - 2}px`
		rem = +rem - 2
		updateWaterfall()
		document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
		changeSetting.textContent = `Base font size: ${rem}px`
		changeSetting.style.visibility = "visible"
		clearTimeout(changeSettingTimeoutID)
		changeSettingTimeoutID = setTimeout(() => (changeSetting.style.visibility = "hidden"), 500)
	}

	// reset transforms
	else if (keyCode == "KeyR") {
		main.style.transform = `translate(0)`
		navForm.style.transform = `translate(0)`
		keySection.style.transform = `translate(0)`
		mainScale.style.transform = `scale(1)`
		websiteData.pushPage.coordinates.x = 0
		websiteData.pushPage.coordinates.y = 0
		websiteData.pushPage.scale = 1
		rem = 16
		document.documentElement.style.fontSize = "16px"
		document.querySelector("#canvas").style.transform = "scale(1)"
		websiteData.weight = 450
		document.querySelector("body").style.fontVariationSettings = `"wght" 450`
		updateCode(null, codeForm)
		updateWaterfall()
	}
}

let active // saves what DOM element is currently active
let focusTimeOutID // to be able to use clearTimeout()
document.addEventListener("focusin", (e) => {
	// console.log("focusin", document.activeElement)

	// new focus: exit text field
	if (document.activeElement != active) exitTextField()

	const prevActive = active

	// save current focused element
	active = document.activeElement

	// when current focused element is blurred, start a timer of 100ms.
	active.addEventListener("blur", onBlurIn)

	// clear timeout when a new element is focused
	clearTimeout(focusTimeOutID)
	focusTimeOutID = null

	if (active.id.includes("block_tab")) {
		console.log("BLOCK TAB")
		if (prevActive.className.includes("question_button")) {
			prevActive.parentElement.querySelector(".question_button").focus()
		} else {
			const checkedMenuInput = document.querySelector("#nav_form input:checked")
			checkedMenuInput.focus()
		}
	}

	// scroll page, if focus reaches bottom or top
	const bounds = active.getBoundingClientRect()
	const paddingOffsetBottom = 200
	if (bounds.top > window.innerHeight - paddingOffsetBottom) {
		const numberOfMoves = Math.floor(
			(bounds.top - (window.innerHeight - paddingOffsetBottom)) / websiteData.pushPage.distance
		)
		for (let i = 0; i < numberOfMoves; i++) {
			pushPage("KeyS")
		}
	}
	const paddingOffsetTop = 16
	if (bounds.top < paddingOffsetTop) {
		const numberOfMoves = Math.ceil(Math.abs(bounds.top - paddingOffsetTop - 32) / websiteData.pushPage.distance)
		console.log("num of moves:", numberOfMoves, "bounds.top:", bounds.top)
		for (let i = 0; i < numberOfMoves; i++) {
			pushPage("KeyW")
		}
	}
})

let prevHasFocus = true
function checkDocumentFocus() {
	if (!isMobile) {
		if (prevHasFocus != document.hasFocus()) {
			changedFocus(document.hasFocus())
		}
		prevHasFocus = document.hasFocus()
	}
}

function changedFocus(hasFocus) {
	if (hasFocus) active.focus()
	changeFavicon(hasFocus)
	hasFocus ? contentRoot.classList.remove("faded") : contentRoot.classList.add("faded")
	clickFocus.style.visibility = hasFocus ? "hidden" : "visible"
	updateCode(null, codeForm)
}

function onBlurIn(e) {
	// remove event listener from so they don't stack
	e.target.removeEventListener("blur", onBlurIn)

	// if this timer runs out before a new element is focused, refocus same element
	if (!isMobile)
		focusTimeOutID = setTimeout(() => {
			active.focus()
		}, 100)
}

setInterval(checkDocumentFocus, 100)
updateNav(null, navForm)
