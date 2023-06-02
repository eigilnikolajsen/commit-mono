const exampleForm = document.querySelector("#examples_form")
const exampleSettingsForm = document.querySelector("#examplesettings_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")
const fontsFieldset = document.querySelector("#fonts_form fieldset")
const weightFieldset = document.querySelector("#weight_form fieldset")
const alternatesContainer = document.querySelector("#alternates_container")
const featuresContainer = document.querySelector("#features_container")

function createCodeSection() {
   websiteData.sections.forEach((section) => {
      if (section.name == "customize") {
         fontsFieldset.innerHTML = ""
         section.content.fonts.forEach((font, index) => {
            const div = document.createElement("div")
            const input = document.createElement("input")
            input.type = "radio"
            input.name = "font"
            input.id = font.id
            input.classList.add("example_font")
            input.value = font.name
            if (index == 0) input.setAttribute("checked", "true")
            const label = document.createElement("label")
            label.textContent = font.name
            label.setAttribute("for", font.id)
            div.append(input, label)
            fontsFieldset.append(div)
         })

         exampleFieldset.innerHTML = ""
         section.content.languages.forEach((language, index) => {
            const div = document.createElement("div")
            const input = document.createElement("input")
            input.type = "radio"
            input.name = "language"
            input.id = language.languageName
            input.classList.add("example_language")
            input.value = language.languageName
            if (index == 0) input.setAttribute("checked", "true")
            const label = document.createElement("label")
            label.textContent = language.languageName
            label.setAttribute("for", language.languageName)
            div.append(input, label)
            exampleFieldset.append(div)
         })

         weightFieldset.innerHTML = ""
         section.content.weights.forEach((weight, index) => {
            const div = document.createElement("div")
            const input = document.createElement("input")
            input.type = "radio"
            input.name = "weight"
            input.id = `weight_${weight}`
            input.classList.add("example_weight")
            input.value = weight
            if (index == 6) input.setAttribute("checked", "true")
            const label = document.createElement("label")
            label.textContent = weight
            label.setAttribute("for", `weight_${weight}`)
            div.append(input, label)
            weightFieldset.append(div)
         })

         featuresContainer.innerHTML = ""
         alternatesContainer.innerHTML = ""
         section.content.features.forEach((feature, index) => {
            const fieldset = document.createElement("fieldset")
            const duo = [0, 0]
            const p = document.createElement("p")
            p.textContent = feature.label
            p.id = `alt_${feature.name}`
            fieldset.append(p)
            duo.forEach((d, index) => {
               const div = document.createElement("div")
               const input = document.createElement("input")
               input.type = "radio"
               input.name = feature.name
               input.id = `${feature.name}${index}`
               input.value = `'${feature.feature}' ${index == 0 ? "off" : "on"}`
               if (!feature.on && index == 0) input.setAttribute("checked", "true")
               if (feature.on && index == 1) input.setAttribute("checked", "true")
               const label = document.createElement("label")
               label.textContent = index == 0 ? "OFF" : "ON"
               label.setAttribute("for", `${feature.name}${index}`)
               div.append(input, label)
               fieldset.append(div)
            })
            if (feature.type == "feature") featuresContainer.append(fieldset)
            else alternatesContainer.append(fieldset)
         })
      }
   })

   updateExamples(null, exampleForm)
   updateExampleSettings(null, exampleSettingsForm)
}

const codeExample = document.querySelector("#code_example")
function updateExamples(event, form) {
   const data = new FormData(form)
   let output = ""
   for (const entry of data) {
      output = `${entry[1]}`
   }

   websiteData.sections.forEach((section) => {
      if (section.name == "customize") {
         section.content.languages.forEach((language, index) => {
            if (language.languageName == output) {
               codeExample.textContent = language.codeExample
               let nums = Array.from(new Array(1000), (x, i) => i + 1).join("\n")
               codeExample.setAttribute("data-before", nums)
            }
         })
      }
   })

   if (event) event.preventDefault()
}

function updateFont(event, form) {
   const data = new FormData(form)
   let output = ""
   for (const entry of data) {
      output = `${entry[1]}`
   }
   codeExample.style.fontFamily = output

   if (event) event.preventDefault()
}

function updateWeight(event, form) {
   const data = new FormData(form)
   let output = ""
   for (const entry of data) {
      output = +entry[1]
   }

   fontDownloadSettings.weight = output
   websiteData.weight = output
   document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}`
   document.querySelector("#download").textContent = `Download CommitMono-${websiteData.weight} with current settings`

   console.log(fontDownloadSettings)

   if (event) event.preventDefault()
}

let fontDownloadSettings = { weight: 450, alternates: {}, features: {} }
let fontDownloadSettingsDefault = {
   weight: 450,
   alternates: {
      cv01: false,
      cv02: false,
      cv03: false,
      cv04: false,
      cv05: false,
      cv06: false,
      cv07: false,
   },
   features: {
      ss01: false,
      ss02: false,
      ss03: true,
      ss04: true,
      ss05: true,
   },
}
function updateExampleSettings(event, form) {
   const data = new FormData(form)
   let output = ""
   let font = ""
   function updateDownloadSettings(type, feature) {
      const key = feature.split("' ")[0].slice(1)
      const value = feature.split("' ")[1] == "on"
      fontDownloadSettings[type][key] = value
   }
   for (const entry of data) {
      if (entry[0] != "font") {
         output += `${entry[1]}, `
         if (entry[1].includes("cv")) updateDownloadSettings("alternates", entry[1])
         if (entry[1].includes("ss")) updateDownloadSettings("features", entry[1])
      } else font = entry[1]
      const label = document.querySelector(`#alt_${entry[0]}`)
      if (label) label.style.fontFeatureSettings = entry[1]
   }

   console.log(fontDownloadSettings)

   const codeExample = document.querySelector("#code_example")
   codeExample.style.fontFeatureSettings = output.slice(0, -2)

   if (event) event.preventDefault()
}

createCodeSection()
