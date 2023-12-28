document.documentElement.style.fontSize = "16px"

const appRoot = document.querySelector("#app_root")
const contentRoot = document.querySelector("#content_root")
const clickFocus = document.querySelector("#click_focus")
const navForm = document.querySelector("#nav_form")

const main = document.querySelector("main")
const mainScale = document.querySelector("#main_scale")
const keySection = document.querySelector("#keyboard_section")
let rem = +document.documentElement.style.fontSize.split("px")[0]

function buildNav() {
    // console.log("buildNav")
    websiteData.sections.forEach((section, index) => {
        const div = document.createElement("div")
        const input = document.createElement("input")
        input.type = "radio"
        input.name = "nav_form"
        input.id = section.name
        input.classList.add("nav_section_input")
        input.value = `section_${index + 1}`
        input.dataset.forform = "nav_form"
        // input.tabIndex = 0
        if (index == 0) {
            input.setAttribute("checked", "true")
        }
        const label = document.createElement("label")
        label.for = section.name
        label.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
        label.classList.add("nav_element")
        label.dataset.sectionIndex = index + 1
        label.setAttribute("for", section.name)
        div.append(input, label)
        navForm.append(div)
    })
}

function updateNav(event, form) {
    // console.log("updateNav")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }
    sectionNavigation(output.split("section_")[1] - 1)

    if (event) event.preventDefault()
}

function pageAnimation() {
    // console.log("pageAnimation")
    const element = document.querySelector("#page_animation")
    element.classList.remove("page_animation")
    setTimeout(() => element.classList.add("page_animation"), 10)
}

let currentSection = 1
let insideTextField = false
function enterTextField() {
    // console.log("enterTextField")
    active = document.activeElement
    setTimeout(() => {
        active.setAttribute("contenteditable", "true")
        active.blur()
        active.focus()
        insideTextField = true
    }, 50)
}
function exitTextField() {
    // console.log("exitTextField")
    document.activeElement.setAttribute("contenteditable", "false")
    insideTextField = false
}

let timesClicked = 0
function onMouseDown(e) {
    if (!isMobile) {
        focusUsingTab = false
        timesClicked++
        if (timesClicked == 20) {
            document.querySelector("#keyboard_container").classList.add("use_keyboard_animation")
            showHideChangeSettings("Try using the keyboard to navigate!", 2400, true)
        }
    }
}
document.addEventListener("mousedown", onMouseDown)

const keys = document.querySelectorAll(".key")
keys.forEach((key) => {
    key.addEventListener("click", () => {
        if (key.dataset.noclick != "true") {
            key.dataset.keyCode.includes("Shift")
                ? keyDown({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: true })
                : keyDown({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: false })
            key.dataset.keyCode.includes("Shift")
                ? keyUp({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: true })
                : keyUp({ code: key.dataset.keyCode, key: key.dataset.key, shiftKey: false })
        }
    })
})

let changeSettingTimeoutID
let focusUsingTab = false
function keyDown(e) {
    focusUsingTab = true
    if (!insideTextField) {
        if (active.nodeName == "INPUT") {
            const shaker = active.parentNode.querySelector("input + label")
            if (shaker) shaker.classList.remove("shake")
        } else {
            active.classList.remove("shake")
        }
    }
    if (e.key == "Enter") {
        if (active.dataset.edit == "true" && !insideTextField) {
            enterTextField()
        } else {
            let node = active
            if (node.nodeName == "INPUT") node = active.parentNode.querySelector("input + label")
            if (active.nodeName == "INPUT") {
                void node?.offsetHeight
                if (node) node.classList.add("shake")
            } else if (active.nodeName != "SUMMARY" && active.nodeName != "BUTTON") {
                void node?.offsetHeight
                if (node) node.classList.add("shake")
            }
        }
    }

    if (!insideTextField || e.key == "Enter") {
        const activeKey = !e.shiftKey
            ? document.querySelector(`.key[data-key-code="${e.key}"]`)
            : document.querySelector(`.key[data-key-code="Shift${e.key}"]`)
        if (activeKey) activeKey.classList.add("active_key")

        if (e.code.includes("Digit")) {
            sectionNavigation(+e.key == 0 ? 9 : +e.key - 1)
        }

        if (e.key == "o") {
            changeFeatureDocs("enable")
        }

        // push page
        if (
            (e.key == "w" ||
                e.key == "a" ||
                e.key == "s" ||
                e.key == "d" ||
                e.key == "r" ||
                e.key == "+" ||
                e.key == "-") &&
            !e.ctrlKey &&
            !e.metaKey
        ) {
            pushPage(e.key)
        }

        if (e.key == "h") {
            document.querySelector("#keyboard_section").classList.toggle("hidden")
        }

        if (e.key == "b" || e.key == "l") {
            if (e.key == "b") websiteData.weight = websiteData.weight == 700 ? 700 : websiteData.weight + 25
            if (e.key == "l") websiteData.weight = websiteData.weight == 200 ? 200 : websiteData.weight - 25
            updateCodeFont()
            document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
                websiteData.italic ? "1" : "0"
            }`
            showHideChangeSettings(`Weight: ${websiteData.weight}. Def: 400, Min: 200, Max: 700.`)
            document.forms["weight_form"][`weight_${websiteData.weight}`].checked = true
            updateWeight(null, weightForm)
        }

        if (e.key == "i") {
            websiteData.italic = !websiteData.italic
            updateCodeFont()
            document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
                websiteData.italic ? "1" : "0"
            }`
            showHideChangeSettings(`Italic: ${websiteData.italic}.`)
        }

        if (e.key == "m") {
            changeMode(!websiteData.invert, websiteData.highContrast)
        }

        if (e.key == "c") {
            changeMode(websiteData.invert, !websiteData.highContrast)
        }

        if (e.key == "k") {
            document.querySelector("body").style.fontFeatureSettings = "'ss01', 'ss03', 'ss04', 'ss05' 0"
        }

        if (e.key.includes("Arrow")) {
            simulateTab(e)
        }
    } else if (e.key == "Escape" && insideTextField) {
        // console.log(insideTextField)
        document.querySelector(".key_code_Escape")?.classList.add("pressed_key")
    }

    if (e.key == "Escape") exitTextField()

    checkTutorialKeys(e)
}
function keyUp(e) {
    const activeKey = document.querySelectorAll(".active_key")
    activeKey?.forEach((key) => key.classList.remove("active_key"))

    if (e.key == "Tab" && document.activeElement.id.includes("block_tab")) {
        // console.log("active nav section then tab")
        const checkedMenuInput = document.querySelector("#nav_form input:checked")
        checkedMenuInput.focus()
    }

    if (e.key == "o") {
        changeFeatureDocs("disable")
    }

    if (e.key == "k") {
        document.querySelector("body").style.fontFeatureSettings = "'ss01', 'ss03', 'ss04', 'ss05'"
    }
}
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

function simulateTab(e) {
    if (active.nodeName != "INPUT") e.preventDefault()
    if (e.key == "ArrowUp" || e.key == "ArrowDown") e.preventDefault()
    document
        .querySelectorAll(".shake, .shake_left, .shake_right, .shake_up, .shake_down")
        .forEach((el) => el.classList.remove("shake", "shake_left", "shake_right", "shake_up", "shake_down"))

    const allTabbable = document.querySelectorAll(
        "#nav_form input:checked, section.visible input:checked, section.visible [tabindex='0']"
    )
    let addShake = false
    let indexOfActive = 0
    allTabbable.forEach((element, i) => (active === element ? (indexOfActive = i) : null))
    let nextElement = null
    if (e.key === "ArrowUp") nextElement = allTabbable[indexOfActive - 1]
    if (e.key === "ArrowDown") nextElement = allTabbable[indexOfActive + 1]

    // // console.log(e.key, nextElement)
    // focus next element
    if (nextElement) {
        let i = 0
        while (elementDoesNotExist(nextElement)) {
            i++
            if (e.key === "ArrowUp") nextElement = allTabbable[indexOfActive - i]
            if (e.key === "ArrowDown") nextElement = allTabbable[indexOfActive + i]
        }
        if (nextElement) {
            nextElement.focus()
        } else {
            addShake = true
        }
    } else if (!(active.nodeName == "INPUT" && (e.key == "ArrowLeft" || e.key == "ArrowRight"))) {
        addShake = true
    }
    if (addShake) {
        let node = active
        if (active.nodeName == "INPUT") node = active.parentNode.querySelector("input + label")
        void node.offsetHeight
        switch (e.key) {
            case "ArrowLeft":
                node.classList.add("shake_left")
                break
            case "ArrowRight":
                node.classList.add("shake_right")
                break
            case "ArrowUp":
                node.classList.add("shake_up")
                break
            case "ArrowDown":
                node.classList.add("shake_down")
                break
            default:
                node.classList.add("shake")
                break
        }
    }
}
const elementDoesNotExist = (element) =>
    element && element.offsetHeight === 0 && element.offsetWidth === 0 && element.nodeName !== "INPUT"

function pushPage(key) {
    // console.log("push page", key)
    const x = websiteData.pushPage.coordinates.x
    const y = websiteData.pushPage.coordinates.y
    const scale = websiteData.pushPage.scale
    const dist = websiteData.pushPage.distance

    // move left
    if (key == "w") {
        main.style.transform = `translate(${x}px, ${y + dist}px)`
        websiteData.pushPage.coordinates.y += dist
    }

    // move left
    else if (key == "a") {
        main.style.transform = `translate(${x + dist}px, ${y}px)`
        websiteData.pushPage.coordinates.x += dist
    }

    // move down
    else if (key == "s") {
        main.style.transform = `translate(${x}px, ${y - dist}px)`
        websiteData.pushPage.coordinates.y -= dist
    }

    // move right
    else if (key == "d") {
        main.style.transform = `translate(${x - dist}px, ${y}px)`
        websiteData.pushPage.coordinates.x -= dist
    }

    // zoom in
    else if (key == "+") {
        rem = (+rem * 0.75 + 1) / 0.75
        document.documentElement.style.fontSize = `${rem}px`
        updateWaterfall()
        document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
        showHideChangeSettings(`Base font size: ${rem * 0.75}px`)
    }

    // zoom out
    else if (key == "-") {
        rem = (+rem * 0.75 - 1) / 0.75
        document.documentElement.style.fontSize = `${rem}px`
        updateWaterfall()
        document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
        showHideChangeSettings(`Base font size: ${rem * 0.75}px`)
    }

    // reset transforms
    else if (key == "r") {
        main.style.transform = `translate(0)`
        websiteData.pushPage.coordinates.x = 0
        websiteData.pushPage.coordinates.y = 0
        websiteData.pushPage.scale = 1
        document.querySelector("#canvas").style.transform = "scale(1)"
        rem = 16
        document.documentElement.style.fontSize = "16px"
        websiteData.weight = 400
        document.querySelector("body").style.fontVariationSettings = `"wght" 400`
        document.forms["weight_form"][`weight_${websiteData.weight}`].checked = true
        document.forms["letter_spacing_form"][`letter_spacing_${websiteData.letterSpacing}`].checked = true
        document.forms["line_height_form"][`line_height_${websiteData.lineHeight}`].checked = true
        codeExample.style.fontFamily = "CommitMono"
        document.querySelector("#font_name").value = ""
        document.querySelector("#font_name + p").textContent = ""
        document.querySelector("#custom_name").textContent = "CommitMono-YourName"
        websiteData.fontName = "CommitMono"
        if (typeof updateCodeFont === "function") updateCodeFont()
        if (typeof updateWaterfall === "function") updateWaterfall()
        if (typeof buildExample === "function") buildExample()
        if (typeof updateWeight === "function") updateWeight(null, weightForm)
        if (typeof updateLetterSpacing === "function") updateLetterSpacing(null, letterSpacingForm)
        if (typeof updateLineHeight === "function") updateLineHeight(null, lineHeightForm)
    }
}

let active // saves what DOM element is currently active
let focusTimeOutID // to be able to use clearTimeout()
function onFocusIn(e) {
    // // console.log("FOCUSIN", document.activeElement)

    // new focus: exit text field
    if (document.activeElement != active) exitTextField()
    if (document.activeElement.id == "font_name") insideTextField = true

    const prevActive = active

    // save current focused element
    active = document.activeElement

    // // when current focused element is blurred, start a timer of 100ms.
    active.addEventListener("blur", onBlurIn)

    // // clear timeout when a new element is focused
    // clearTimeout(focusTimeOutID)
    // focusTimeOutID = null

    if (active.id.includes("block_tab")) {
        // console.log("BLOCK TAB")
        if (prevActive.className.includes("question_button")) {
            prevActive.parentElement.querySelector(".question_button").focus()
        } else {
            prevActive.focus()
            // const checkedMenuInput = document.querySelector("#nav_form input:checked")
            // checkedMenuInput.focus()
        }
    }

    // if focus using tab, scroll page, if focus reaches bottom or top
    if (focusUsingTab) {
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
        const paddingOffsetTop = 24
        if (!document.activeElement.className.includes("nav")) {
            if (bounds.top < paddingOffsetTop) {
                const numberOfMoves = Math.ceil(
                    Math.abs(bounds.top - paddingOffsetTop - 32) / websiteData.pushPage.distance
                )
                // console.log("num of moves:", numberOfMoves, "bounds.top:", bounds.top)
                for (let i = 0; i < numberOfMoves; i++) {
                    pushPage("KeyW")
                }
            }
        }
    }
}
document.addEventListener("focusin", onFocusIn)

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
    // if (hasFocus && active) active.focus()
    // changeFavicon(hasFocus)
    // hasFocus ? contentRoot.classList.remove("faded") : contentRoot.classList.add("faded")
    // clickFocus.style.visibility = hasFocus ? "hidden" : "visible"
    // updateCode(null, codeForm)
}

function onBlurIn(e) {
    // remove event listener from so they don't stack
    e.target.removeEventListener("blur", onBlurIn)

    // if this timer runs out before a new element is focused, refocus same element
    // if (!isMobile) focusTimeOutID = setTimeout(() => active.focus(), 100)
}

let tutorialFinished = false
function checkTutorialKeys(e) {
    if (!tutorialFinished) {
        websiteData.tutorial.forEach((key) => {
            if (e.key == key) {
                if (e.key == "Enter") {
                    if (document.activeElement.dataset.edit == "true") {
                        document.querySelector(".key_code_Enter")?.classList.add("pressed_key")
                    }
                } else if (e.key != "Escape") {
                    let keyNode
                    if (key != "+") keyNode = document.querySelector(`.key_code_${key}`)
                    if (key == "+") keyNode = document.querySelector(".key_code_plus")
                    if (key == "-") keyNode = document.querySelector(".key_code_minus")
                    keyNode?.classList.add("pressed_key")
                }
            }
        })
        const numnerOfTutorialKeys = document.querySelectorAll(".tutorial_key").length
        const numberOfPressedKeys = document.querySelectorAll(".tutorial_key.pressed_key").length

        if (numnerOfTutorialKeys === numberOfPressedKeys) {
            // console.log("TUTORIAL FINISHED!!")
            tutorialFinished = true
            const tutorialContainer = document.querySelector("#tutorial_complete")
            tutorialContainer.innerHTML = `<p>Tutorial complete! Your present is the variable version of Commit Mono:</p>
<p><a href="/src/fonts/fontlab/CommitMonoV143-VF.ttf" tabindex="0">Download CommitMono-VF.ttf</a></p>
<p><a href="/src/fonts/fontlab/CommitMonoV143-VF.woff2" tabindex="0">Download CommitMono-VF.woff2</a></p>
<br />`
        }
    }
}

function sectionNavigation(sectionIndex) {
    const sectionName = websiteData.sections[sectionIndex]?.name

    pageAnimation()

    const attemptedSection = document.querySelector(`[value="section_${sectionIndex + 1}"]`)
    if (attemptedSection && sectionName) {
        attemptedSection.focus()
        document.forms["nav_form"][sectionName].checked = true
    }

    websiteData.sections.forEach((section, index) => {
        const sectionContainer = document.querySelector(`#section_${index + 1}`)
        sectionContainer.classList.remove("visible")
        if (index == sectionIndex) {
            sectionContainer.classList.add("visible")
        }
    })
    main.style.transform = `translate(0)`
    navForm.style.transform = `translate(0)`
    keySection.style.transform = `translate(0)`
    websiteData.pushPage.coordinates.x = 0
    websiteData.pushPage.coordinates.y = 0
    websiteData.pushPage.scale = 1
}

// when the user has scrolled manually using the keyboard the page is offset
// so when you use your scroll wheen to scroll back up, you can't see the top
// this little script combats that
mainScale.addEventListener("scroll", onScroll)
function onScroll(e) {
    const { x, y } = websiteData.pushPage.coordinates
    if (x != 0 || y != 0) {
        main.style.transform = `translate(0)`
        websiteData.pushPage.coordinates = { x: 0, y: 0 }
        mainScale.scrollBy(-x, -y)
    }
}

// edit text directly when clicked on
document.addEventListener("click", (e) => e.target.dataset.edit == "true" && enterTextField())
