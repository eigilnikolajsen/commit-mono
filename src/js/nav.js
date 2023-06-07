document.documentElement.style.fontSize = "16px"

const appRoot = document.querySelector("#app_root")
const contentRoot = document.querySelector("#content_root")
const clickFocus = document.querySelector("#click_focus")
const navForm = document.querySelector("#nav_form")

function buildNav() {
   console.log("buildNav")
   websiteData.sections.forEach((section, index) => {
      const div = document.createElement("div")
      const input = document.createElement("input")
      input.type = "radio"
      input.name = "nav"
      input.id = section.name
      input.classList.add("nav_section_input")
      input.value = `section_${index + 1}`
      input.tabIndex = 0
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
   console.log("updateNav")
   const data = new FormData(form)
   let output = ""
   for (const entry of data) {
      output = `${entry[1]}`
   }
   sectionNavigation(output.split("section_")[1] - 1)

   // pageAnimation()

   // websiteData.sections.forEach((section, index) => {
   //    const sectionContainer = document.querySelector(`#section_${index + 1}`)
   //    if (sectionContainer.id == output) {
   //       sectionContainer.style.display = "block"
   //       sectionNavigation(section.name, `Digit${index + 1}`)
   //    } else {
   //       sectionContainer.style.display = "none"
   //    }
   // })
   // main.style.transform = `translate(0)`
   // navForm.style.transform = `translate(0)`
   // keySection.style.transform = `translate(0)`
   // websiteData.pushPage.coordinates.x = 0
   // websiteData.pushPage.coordinates.y = 0
   // websiteData.pushPage.scale = 1

   // const sectionName = websiteData.sections[output.split("section_")[1] - 1]?.name
   // console.log("sectionNavigation from updateNav")
   // sectionNavigation(sectionName)

   if (event) event.preventDefault()
}

function pageAnimation() {
   console.log("pageAnimation")
   const element = document.querySelector("#page_animation")
   element.classList.remove("page_animation")
   setTimeout(() => element.classList.add("page_animation"), 10)
}

let currentSection = 1
let insideTextField = false
function enterTextField() {
   console.log("enterTextField")
   active = document.activeElement
   setTimeout(() => {
      active.setAttribute("contenteditable", "true")
      active.blur()
      active.focus()
   }, 40)
   insideTextField = true
}
function exitTextField() {
   console.log("exitTextField")
   document.activeElement.setAttribute("contenteditable", "false")
   insideTextField = false
}

let timesClicked = 0
function onClick(e) {
   if (e.pointerType !== "") {
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
   if (e.code == "KeyE" && document.activeElement.dataset.edit == "true" && !insideTextField) enterTextField()

   if (!insideTextField || e.code == "KeyE") {
      checkTutorialKeys(e)

      const activeKey = !e.shiftKey
         ? document.querySelector(`.key[data-key-code="${e.code}"]`)
         : document.querySelector(`.key[data-key-code="Shift${e.code}"]`)
      activeKey?.classList.add("active_key")

      if (e.code.includes("Digit")) {
         const digitNumber = e.code.split("Digit")[1] - 1
         sectionNavigation(digitNumber == -1 ? 9 : digitNumber)
      }

      if (e.code == "KeyO") {
         changeFeatureDocumentation("switch")
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
         document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}`
         showHideChangeSettings(`Weight: ${websiteData.weight}. Def: 450, Min: 300, Max: 700.`)
         document.querySelector(
            "#download"
         ).textContent = `Download CommitMono-${websiteData.weight} with current settings`
         document.forms["weight_form"][`weight_${websiteData.weight}`].checked = true
      }

      if (e.code == "KeyM") {
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
   } else if (e.code == "Escape" && insideTextField) {
      console.log(insideTextField)
      document.querySelector(".key_code_Escape")?.classList.add("pressed_key")
   }

   if (e.code == "Escape") exitTextField()
}
function keyUp(e) {
   const activeKey = document.querySelectorAll(".active_key")
   activeKey?.forEach((key) => key.classList.remove("active_key"))

   if (e.code == "Tab" && document.activeElement.id.includes("block_tab")) {
      console.log("active nav section then tab")
      const checkedMenuInput = document.querySelector("#nav_form input:checked")
      checkedMenuInput.focus()
   }
}
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

const main = document.querySelector("main")
const mainScale = document.querySelector("#main_scale")
const keySection = document.querySelector("#keyboard_section")
let rem = +document.documentElement.style.fontSize.split("px")[0]

function pushPage(keyCode) {
   console.log("push page", keyCode)
   const x = websiteData.pushPage.coordinates.x
   const y = websiteData.pushPage.coordinates.y
   const scale = websiteData.pushPage.scale
   const dist = websiteData.pushPage.distance

   // move left
   if (keyCode == "KeyW") {
      main.style.transform = `translate(${x}px, ${y + dist}px)`
      navForm.style.transform = `translate(${x}px, 0)`
      keySection.style.transform = `translate(${x}px, 0)`
      websiteData.pushPage.coordinates.y += dist
   }

   // move left
   else if (keyCode == "KeyA") {
      main.style.transform = `translate(${x + dist}px, ${y}px)`
      navForm.style.transform = `translate(${x + dist}px, 0)`
      keySection.style.transform = `translate(${x + dist}px, 0)`
      websiteData.pushPage.coordinates.x += dist
   }

   // move down
   else if (keyCode == "KeyS") {
      main.style.transform = `translate(${x}px, ${y - dist}px)`
      navForm.style.transform = `translate(${x}px, 0)`
      keySection.style.transform = `translate(${x}px, 0)`
      websiteData.pushPage.coordinates.y -= dist
   }

   // move right
   else if (keyCode == "KeyD") {
      main.style.transform = `translate(${x - dist}px, ${y}px)`
      navForm.style.transform = `translate(${x - dist}px, 0)`
      keySection.style.transform = `translate(${x - dist}px, 0)`
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
      navForm.style.transform = `translate(0)`
      keySection.style.transform = `translate(0)`
      websiteData.pushPage.coordinates.x = 0
      websiteData.pushPage.coordinates.y = 0
      websiteData.pushPage.scale = 1
      document.querySelector("#canvas").style.transform = "scale(1)"
      rem = 16
      document.documentElement.style.fontSize = "16px"
      websiteData.weight = 450
      document.querySelector("body").style.fontVariationSettings = `"wght" 450`
      if (typeof updateCodeFont === "function") updateCodeFont()
      if (typeof updateWaterfall === "function") updateWaterfall()
      if (typeof buildExample === "function") buildExample()
   }
}

let isSafari = 0
let active // saves what DOM element is currently active
let focusTimeOutID // to be able to use clearTimeout()
function onFocusIn(e) {
   // console.log("focusin", document.activeElement)

   // new focus: exit text field
   if (document.activeElement != active) exitTextField()

   const prevActive = active

   // save current focused element
   active = document.activeElement

   if (focusUsingTab) {
      if (prevActive?.id == "navigate_description" && active.id == "tutorial" && isSafari == 0) {
         console.log("safari")
         isSafari = 1
         document.querySelector("#safari").classList.add("safari_visible")
      }

      if (active.id == "focus_check") {
         console.log("not safari")
         isSafari = -1
         if (prevActive.id == "navigate_description") {
            document.querySelector("#tutorial").focus()
         }
         if (prevActive.id == "tutorial") {
            document.querySelector("#navigate_description").focus()
         }
         document.querySelector("#focus_check")?.remove()
      }
   }
   // // when current focused element is blurred, start a timer of 100ms.
   // active.addEventListener("blur", onBlurIn)

   // // clear timeout when a new element is focused
   // clearTimeout(focusTimeOutID)
   // focusTimeOutID = null

   if (active.id.includes("block_tab")) {
      console.log("BLOCK TAB")
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
            console.log("num of moves:", numberOfMoves, "bounds.top:", bounds.top)
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
   if (hasFocus) active.focus()
   changeFavicon(hasFocus)
   hasFocus ? contentRoot.classList.remove("faded") : contentRoot.classList.add("faded")
   clickFocus.style.visibility = hasFocus ? "hidden" : "visible"
   // updateCode(null, codeForm)
}

function onBlurIn(e) {
   // remove event listener from so they don't stack
   e.target.removeEventListener("blur", onBlurIn)

   // if this timer runs out before a new element is focused, refocus same element
   if (!isMobile) focusTimeOutID = setTimeout(() => active.focus(), 100)
}

function goToSection(keyCode) {
   console.log("goToSection")
   let section = +keyCode.split("Digit")[1]
   section = section == 0 ? 10 : section
   const sectionName = websiteData.sections[section - 1]?.name
   const attemptedSection = document.querySelector(`[value="section_${section}"]`)
   if (attemptedSection && sectionName) {
      attemptedSection.focus()
      document.forms["nav_form"][sectionName].checked = true
      updateNav(null, navForm)
   }
}

function checkTutorialKeys(e) {
   websiteData.tutorial.forEach((key) => {
      if (e.code == key) {
         if (e.code.includes("Arrow")) {
            if (document.activeElement.nodeName == "INPUT") {
               const keyNode = document.querySelector(`.key_code_${key}`)
               keyNode?.classList.add("pressed_key")
            }
         } else if (e.code == "KeyE") {
            if (document.activeElement.dataset.edit == "true") {
               document.querySelector(".key_code_KeyE")?.classList.add("pressed_key")
            }
         } else if (e.code != "Escape") {
            const keyNode = document.querySelector(`.key_code_${key}`)
            keyNode?.classList.add("pressed_key")
         }
      }
      if (key == "ShiftTab" && e.code == "Tab" && e.shiftKey) {
         document.querySelector(".key_code_ShiftTab1").classList.add("pressed_key")
         document.querySelector(".key_code_ShiftTab2").classList.add("pressed_key")
      }
   })
   const numnerOfTutorialKeys = document.querySelectorAll(".tutorial_key").length
   const numberOfPressedKeys = document.querySelectorAll(".tutorial_key.pressed_key").length

   if (numnerOfTutorialKeys === numberOfPressedKeys) console.log("TUTORIAL FINISHED!!")
}
function sectionNavigation(sectionIndex, fromPopstate) {
   console.log(window.history)
   const sectionName = websiteData.sections[sectionIndex]?.name
   if (!fromPopstate) {
      window.history.pushState({ name: sectionName }, `Go to section ${sectionName}`, `/${sectionName}`)
   }

   pageAnimation()

   const attemptedSection = document.querySelector(`[value="section_${sectionIndex + 1}"]`)
   if (attemptedSection && sectionName) {
      attemptedSection.focus()
      document.forms["nav_form"][sectionName].checked = true
   }

   websiteData.sections.forEach((section, index) => {
      const sectionContainer = document.querySelector(`#section_${index + 1}`)
      if (index == sectionIndex) {
         sectionContainer.style.display = "block"
      } else {
         sectionContainer.style.display = "none"
      }
   })
   main.style.transform = `translate(0)`
   navForm.style.transform = `translate(0)`
   keySection.style.transform = `translate(0)`
   websiteData.pushPage.coordinates.x = 0
   websiteData.pushPage.coordinates.y = 0
   websiteData.pushPage.scale = 1
}

function onPopState(e) {
   console.log(e)
   e.preventDefault()
   if (e.state) {
      websiteData.sections.forEach((section, index) => {
         if (section.name === e.state.name) sectionNavigation(index, true)
      })
   }
}
window.addEventListener("popstate", onPopState)
