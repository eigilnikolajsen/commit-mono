document.documentElement.style.fontSize = "16px"

const appRoot = document.querySelector("#app_root")
const contentRoot = document.querySelector("#content_root")
const clickFocus = document.querySelector("#click_focus")
const navForm = document.querySelector("#nav_form")
const changeSetting = document.querySelector("#change_setting p")

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
   pageAnimation()
   // goToSection("Digit1")
   websiteData.sections.forEach((section, index) => {
      const sectionContainer = document.querySelector(`#section_${index + 1}`)
      if (sectionContainer.id == output) {
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

// document.addEventListener("scroll", (e) => {
//    console.log(window.scrollY, e)
//    window.scroll(0, Math.round(window.scrollY / 16) * 16)
// })

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
function keyDown(e) {
   if (e.code == "KeyE" && document.activeElement.dataset.edit == "true" && !insideTextField) enterTextField()

   if (e.code == "Escape") exitTextField()

   if (!insideTextField || e.code == "KeyE") {
      websiteData.tutorial.forEach((key) => {
         if (e.code == key) {
            const keyNode = document.querySelector(`.key_code_${key}`)
            keyNode?.classList.add("pressed_key")
         }
         if (key == "ShiftTab" && e.code == "Tab" && e.shiftKey) {
            const keyNode = document.querySelector(".key_code_ShiftTab")
            keyNode.classList.add("pressed_key")
         }
      })

      const activeKey = !e.shiftKey
         ? document.querySelector(`.key[data-key-code="${e.code}"]`)
         : document.querySelector(`.key[data-key-code="Shift${e.code}"]`)
      activeKey?.classList.add("active_key")

      if (e.code.includes("Digit")) {
         goToSection(e.code)
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
         changeSetting.textContent = `Weight: ${websiteData.weight}. Def: 450, Min: 300, Max: 700.`
         changeSetting.style.visibility = "visible"
         clearTimeout(changeSettingTimeoutID)
         changeSettingTimeoutID = setTimeout(() => (changeSetting.style.visibility = "hidden"), 500)
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
   }
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
      changeSetting.textContent = `Base font size: ${rem * 0.75}px`
      changeSetting.style.visibility = "visible"
      clearTimeout(changeSettingTimeoutID)
      changeSettingTimeoutID = setTimeout(() => (changeSetting.style.visibility = "hidden"), 500)
   }

   // zoom out
   else if (keyCode == "Slash") {
      rem = (+rem * 0.75 - 1) / 0.75
      document.documentElement.style.fontSize = `${rem}px`
      updateWaterfall()
      document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
      changeSetting.textContent = `Base font size: ${rem * 0.75}px`
      changeSetting.style.visibility = "visible"
      clearTimeout(changeSettingTimeoutID)
      changeSettingTimeoutID = setTimeout(() => (changeSetting.style.visibility = "hidden"), 500)
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

let active // saves what DOM element is currently active
let focusTimeOutID // to be able to use clearTimeout()
document.addEventListener("focusin", onFocusIn)

function onFocusIn(e) {
   // console.log("focusin", document.activeElement)

   // new focus: exit text field
   if (document.activeElement != active) exitTextField()

   const prevActive = active

   // save current focused element
   active = document.activeElement

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
}

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
   pageAnimation()
   let section = +keyCode.split("Digit")[1]
   section = section == 0 ? 10 : section
   const sectionName = websiteData.sections[section - 1]?.name
   const attemptedSection = document.querySelector(`[value="section_${section}"]`)
   if (attemptedSection && sectionName) {
      attemptedSection.focus()
      document.forms["nav_form"][sectionName].checked = true
      updateNav(null, navForm)
      document.querySelector("#canvas").style.transform = "scale(1)"
   }
}
