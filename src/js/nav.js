document.documentElement.style.fontSize = "16px"

const appRoot = document.querySelector("#app_root")
const contentRoot = document.querySelector("#content_root")
const clickFocus = document.querySelector("#click_focus")
const navForm = document.querySelector("#nav_form")

const main = document.querySelector("main")
const mainScale = document.querySelector("#main_scale")
const keySection = document.querySelector("#keyboard_section")
let rem = +document.documentElement.style.fontSize.split("px")[0]

const downloadButton = document.querySelector("#download")

function buildNav() {
    consol.log("buildNav")
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
    consol.log("updateNav")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }
    sectionNavigation(output.split("section_")[1] - 1)

    if (event) event.preventDefault()
}

function pageAnimation() {
    consol.log("pageAnimation")
    const element = document.querySelector("#page_animation")
    element.classList.remove("page_animation")
    setTimeout(() => element.classList.add("page_animation"), 10)
}

let currentSection = 1
let insideTextField = false
function enterTextField() {
    consol.log("enterTextField")
    active = document.activeElement
    setTimeout(() => {
        active.setAttribute("contenteditable", "true")
        active.blur()
        active.focus()
    }, 40)
    insideTextField = true
}
function exitTextField() {
    consol.log("exitTextField")
    document.activeElement.setAttribute("contenteditable", "false")
    insideTextField = false
}

let timesClicked = 0
function onClick(e) {
    if (e.pointerType !== "" && !isMobile) {
        focusUsingTab = false
        timesClicked++
        if (timesClicked == 10) {
            document.querySelector("#keyboard_container").classList.add("use_keyboard_animation")
            showHideChangeSettings("Use keyboard to navigate!", 2400, true)
        }
    }
}
document.addEventListener("click", onClick)

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
    if (active.nodeName == "INPUT") {
        active.parentNode.querySelector("input + label").classList.remove("shake")
    } else {
        active.classList.remove("shake")
    }
    if (e.code == "Enter") {
        if (active.dataset.edit == "true" && !insideTextField) {
            enterTextField()
        } else {
            // setTimeout(() => active.classList.add("shake"), 0)
            // active.classList.add("shake")
            if (active.nodeName == "INPUT") {
                setTimeout(() => active.parentNode.querySelector("input + label").classList.add("shake"), 0)
            } else if (active.nodeName != "SUMMARY" && !active.className.includes("download_button")) {
                setTimeout(() => active.classList.add("shake"), 0)
            }

            console.log(active)
        }
    }

    if (!insideTextField || e.code == "Enter") {
        const activeKey = !e.shiftKey
            ? document.querySelector(`.key[data-key-code="${e.code}"]`)
            : document.querySelector(`.key[data-key-code="Shift${e.code}"]`)
        activeKey?.classList.add("active_key")

        if (e.code.includes("Digit")) {
            const digitNumber = e.code.split("Digit")[1] - 1
            sectionNavigation(digitNumber == -1 ? 9 : digitNumber)
        }

        if (e.code == "KeyO") {
            changeFeatureDocs("enable")
        }

        // push page
        if (
            (e.code == "KeyW" ||
                e.code == "KeyA" ||
                e.code == "KeyS" ||
                e.code == "KeyD" ||
                e.code == "KeyR" ||
                e.code == "Minus" ||
                e.code == "Slash") &&
            !e.ctrlKey &&
            !e.metaKey
        ) {
            pushPage(e.code)
        }

        if (e.code == "KeyH") {
            document.querySelector("#keyboard_section").classList.toggle("hidden")
        }

        if (e.code == "KeyB" || e.code == "KeyL") {
            if (e.code == "KeyB") websiteData.weight = websiteData.weight == 700 ? 700 : websiteData.weight + 25
            if (e.code == "KeyL") websiteData.weight = websiteData.weight == 300 ? 300 : websiteData.weight - 25
            updateCodeFont()
            document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
                websiteData.italic ? "1" : "0"
            }`
            showHideChangeSettings(`Weight: ${websiteData.weight}. Def: 450, Min: 300, Max: 700.`)
            document.forms["weight_form"][`weight_${websiteData.weight}`].checked = true
            updateWeight(null, weightForm)
        }

        if (e.code == "KeyI") {
            websiteData.italic = !websiteData.italic
            updateCodeFont()
            document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
                websiteData.italic ? "1" : "0"
            }`
            showHideChangeSettings(`Italic: ${websiteData.italic}.`)
        }

        if (e.code == "KeyM") {
            changeMode({ matches: !websiteData.invert })
        }

        if (e.code == "KeyK") {
            document.querySelector("body").style.fontFeatureSettings = "'ss01', 'ss03', 'ss04', 'ss05' 0"
        }

        if (e.code == "ArrowUp" || e.code == "ArrowDown") {
            console.log(e.code)
            e.preventDefault()
            simulateTab(e.code)
        }
    } else if (e.code == "Escape" && insideTextField) {
        consol.log(insideTextField)
        document.querySelector(".key_code_Escape")?.classList.add("pressed_key")
    }

    if (e.code == "Escape") exitTextField()

    checkTutorialKeys(e)
}
function keyUp(e) {
    const activeKey = document.querySelectorAll(".active_key")
    activeKey?.forEach((key) => key.classList.remove("active_key"))

    if (e.code == "Tab" && document.activeElement.id.includes("block_tab")) {
        consol.log("active nav section then tab")
        const checkedMenuInput = document.querySelector("#nav_form input:checked")
        checkedMenuInput.focus()
    }

    if (e.code == "KeyO") {
        changeFeatureDocs("disable")
    }

    if (e.code == "KeyK") {
        document.querySelector("body").style.fontFeatureSettings = "'ss01', 'ss03', 'ss04', 'ss05'"
    }
}
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

function simulateTab(keyCode) {
    const allTabbable = document.querySelectorAll(
        "#nav_form input:checked, section.visible input:checked, section.visible [tabindex='0']"
    )
    // console.log(allTabbable)
    let indexOfActive = 0
    allTabbable.forEach((element, i) => (active === element ? (indexOfActive = i) : null))
    let nextElement = null
    if (keyCode === "ArrowUp") nextElement = allTabbable[indexOfActive - 1]
    if (keyCode === "ArrowDown") nextElement = allTabbable[indexOfActive + 1]

    // focus next element
    if (nextElement) {
        let i = 0
        while (elementExists(nextElement)) {
            i++
            if (keyCode === "ArrowUp") nextElement = allTabbable[indexOfActive - i]
            if (keyCode === "ArrowDown") nextElement = allTabbable[indexOfActive + i]
        }
        if (nextElement) {
            console.log(nextElement.offsetHeight)
            nextElement.focus()
        } else {
            if (active.nodeName == "INPUT") {
                setTimeout(() => active.parentNode.querySelector("input + label").classList.add("shake"), 0)
            } else {
                setTimeout(() => active.classList.add("shake"), 0)
            }
        }
    } else {
        if (active.nodeName == "INPUT") {
            setTimeout(() => active.parentNode.querySelector("input + label").classList.add("shake"), 0)
        } else {
            setTimeout(() => active.classList.add("shake"), 0)
        }
    }
}
const elementExists = (element) =>
    element && element.offsetHeight === 0 && element.offsetWidth === 0 && element.nodeName !== "INPUT"

function pushPage(keyCode) {
    consol.log("push page", keyCode)
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
        rem = (+rem * 0.75 + 1) / 0.75
        document.documentElement.style.fontSize = `${rem}px`
        updateWaterfall()
        document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
        showHideChangeSettings(`Base font size: ${rem * 0.75}px`)
    }

    // zoom out
    else if (keyCode == "Slash") {
        rem = (+rem * 0.75 - 1) / 0.75
        document.documentElement.style.fontSize = `${rem}px`
        updateWaterfall()
        document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
        showHideChangeSettings(`Base font size: ${rem * 0.75}px`)
    }

    // reset transforms
    else if (keyCode == "KeyR") {
        main.style.transform = `translate(0)`
        websiteData.pushPage.coordinates.x = 0
        websiteData.pushPage.coordinates.y = 0
        websiteData.pushPage.scale = 1
        document.querySelector("#canvas").style.transform = "scale(1)"
        rem = 16
        document.documentElement.style.fontSize = "16px"
        websiteData.weight = 450
        document.querySelector("body").style.fontVariationSettings = `"wght" 450`
        document.querySelector(
            "#download"
        ).textContent = `Download CommitMono-${websiteData.weight} with current settings`
        document.forms["weight_form"][`weight_${websiteData.weight}`].checked = true
        codeExample.style.fontFamily = "CommitMono"
        if (typeof updateCodeFont === "function") updateCodeFont()
        if (typeof updateWaterfall === "function") updateWaterfall()
        if (typeof buildExample === "function") buildExample()
        if (typeof updateWeight === "function") updateWeight(null, weightForm)
    }
}

let isSafari = 0
let active // saves what DOM element is currently active
let focusTimeOutID // to be able to use clearTimeout()
function onFocusIn(e) {
    // consol.log("FOCUSIN", document.activeElement)

    // new focus: exit text field
    if (document.activeElement != active) exitTextField()

    const prevActive = active

    // save current focused element
    active = document.activeElement

    // if (focusUsingTab) {
    //     if (prevActive?.id == "navigate_description" && active.id == "tutorial" && isSafari == 0) {
    //         consol.log("safari")
    //         isSafari = 1
    //         document.querySelector("#safari").classList.add("safari_visible")
    //     }

    //     if (active.id == "focus_check") {
    //         consol.log("not safari")
    //         isSafari = -1
    //         if (prevActive.id == "navigate_description") {
    //             document.querySelector("#tutorial").focus()
    //         }
    //         if (prevActive.id == "tutorial") {
    //             document.querySelector("#navigate_description").focus()
    //         }
    //         document.querySelector("#focus_check")?.remove()
    //     }
    // }
    // // when current focused element is blurred, start a timer of 100ms.
    // active.addEventListener("blur", onBlurIn)

    // // clear timeout when a new element is focused
    // clearTimeout(focusTimeOutID)
    // focusTimeOutID = null

    if (active.id.includes("block_tab")) {
        consol.log("BLOCK TAB")
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
                consol.log("num of moves:", numberOfMoves, "bounds.top:", bounds.top)
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
    if (hasFocus && active) active.focus()
    changeFavicon(hasFocus)
    hasFocus ? contentRoot.classList.remove("faded") : contentRoot.classList.add("faded")
    clickFocus.style.visibility = hasFocus ? "hidden" : "visible"
    // updateCode(null, codeForm)
}

function onBlurIn(e) {
    // remove event listener from so they don't stack
    e.target.removeEventListener("blur", onBlurIn)

    document.querySelectorAll(".shake").forEach((e) => e.classList.remove("shake"))

    // if this timer runs out before a new element is focused, refocus same element
    if (!isMobile) focusTimeOutID = setTimeout(() => active.focus(), 100)
}

let tutorialFinished = false
function checkTutorialKeys(e) {
    if (!tutorialFinished) {
        websiteData.tutorial.forEach((key) => {
            if (e.code == key) {
                if (e.code == "Enter") {
                    if (document.activeElement.dataset.edit == "true") {
                        document.querySelector(".key_code_Enter")?.classList.add("pressed_key")
                    }
                } else if (e.code != "Escape") {
                    const keyNode = document.querySelector(`.key_code_${key}`)
                    keyNode?.classList.add("pressed_key")
                }
            }
        })
        const numnerOfTutorialKeys = document.querySelectorAll(".tutorial_key").length
        const numberOfPressedKeys = document.querySelectorAll(".tutorial_key.pressed_key").length

        if (numnerOfTutorialKeys === numberOfPressedKeys) {
            consol.log("TUTORIAL FINISHED!!")
            tutorialFinished = true
            const tutorialContainer = document.querySelector("#tutorial_complete")
            tutorialContainer.innerHTML = `<p>Tutorial complete! Your present is the variable version of Commit Mono:</p>
<p><a href="/src/fonts/CommitMonoV127-VF.ttf">Download CommitMono-VF.ttf</a></p>
<p><a href="/src/fonts/CommitMonoV127-VF.woff2">Download CommitMono-VF.woff2</a></p>
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
