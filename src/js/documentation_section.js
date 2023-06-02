const featuresDocu = document.querySelector("#features_docu")

let customizeContent
let documentationContent
websiteData.sections.forEach((section) => {
   if (section.name == "customize") customizeContent = section.content
   if (section.name == "documentation") documentationContent = section.content
})

function buildDocumentation() {
   customizeContent.features.forEach((feature) => {
      const container = document.createElement("div")
      const h2 = document.createElement("h2")
      h2.textContent = feature.description
      const exampleOn = document.createElement("p")
      exampleOn.textContent = feature.documentationExample
      exampleOn.classList.add("documentation_example")
      const exampleOff = document.createElement("p")
      exampleOff.textContent = feature.documentationExample
      exampleOff.classList.add("documentation_example")
      container.append(h2, exampleOn, exampleOff)
      featuresDocu.append(container)
   })
}
buildDocumentation()
