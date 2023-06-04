const featuresDocu = document.querySelector("#features_docu")

let customizeContent
let documentationContent
websiteData.sections.forEach((section) => {
   if (section.name == "customize") customizeContent = section.content
   if (section.name == "documentation") documentationContent = section.content
})

function buildDocumentation() {
   console.log("buildDocumentation")
   customizeContent.features.forEach((feature) => {
      const sizes = [
         [3, 4],
         [2, 2.5],
         [1, 1.5],
         [0.75, 1],
         [0.5, 1],
      ]
      const container = document.createElement("div")
      const h2 = document.createElement("h2")
      const featureDescriptionWithSpan = feature.description
         .split("|")
         .map((l) =>
            l == "OFF"
               ? `<span class="span_off${
                    !feature.on ? " active_feature" : ""
                 }" onclick="changeFeatureDocumentation('disable')">[OFF]</span>`
               : l == "ON"
               ? `<span class="span_on${
                    feature.on ? " active_feature" : ""
                 }" onclick="changeFeatureDocumentation('enable')">[ON]</span>`
               : l
         )
         .join("")
      h2.innerHTML = featureDescriptionWithSpan
      h2.tabIndex = 0
      h2.dataset.edit = "true"
      const p = document.createElement("p")
      p.textContent = `Default: ${feature.on ? "ON" : "OFF"}`
      const br1 = document.createElement("br")
      const br2 = document.createElement("br")
      const br3 = document.createElement("br")
      container.append(br1, br2, br3, h2, p)
      sizes.forEach((size) => {
         const exampleText = document.createElement("p")
         exampleText.textContent = feature.documentationExample
         exampleText.classList.add("documentation_example", `documentation_${feature.type}`)
         exampleText.dataset.feature = feature.feature
         exampleText.style.fontSize = `${size[0]}rem`
         exampleText.style.lineHeight = `${size[1]}rem`
         container.append(exampleText)
      })
      featuresDocu.append(container)
   })
   const charH2 = document.createElement("h2")
   charH2.textContent = "Full characterset without alternates. Support for Greek and Cyrillic coming soon."
   const charset = document.createElement("p")
   const tunedCharset = websiteData.charset.split("").join(" ")
   charset.textContent = tunedCharset
   charset.id = "charset"
   charset.tabIndex = 0
   charset.dataset.edit = "true"
   const br1 = document.createElement("br")
   const br2 = document.createElement("br")
   const br3 = document.createElement("br")
   const br4 = document.createElement("br")
   const end = document.createElement("p")
   end.textContent = "End of line."
   end.tabIndex = 0
   featuresDocu.append(br1, br2, br3, charH2, br4, charset, end)
}

function changeFeatureDocumentation(enable) {
   console.log("changeFeatureDocumentation")
   if (enable == "enable") {
      websiteData.enableFeaturesInDocumentation = true
   } else if (enable == "disable") {
      websiteData.enableFeaturesInDocumentation = false
   } else if (enable == "switch") {
      websiteData.enableFeaturesInDocumentation = !websiteData.enableFeaturesInDocumentation
   }
   const enabled = websiteData.enableFeaturesInDocumentation
   const allExampleTexts = document.querySelectorAll(".documentation_example")
   allExampleTexts.forEach((text) => {
      text.style.fontFeatureSettings = `"${text.dataset.feature}" ${enabled ? 1 : 0}`
   })
   const allSpanOff = document.querySelectorAll(".span_off")
   const allSpanOn = document.querySelectorAll(".span_on")
   if (enabled) {
      allSpanOff.forEach((span) => span.classList.remove("active_feature"))
      allSpanOn.forEach((span) => span.classList.add("active_feature"))
   } else {
      allSpanOff.forEach((span) => span.classList.add("active_feature"))
      allSpanOn.forEach((span) => span.classList.remove("active_feature"))
   }
}
