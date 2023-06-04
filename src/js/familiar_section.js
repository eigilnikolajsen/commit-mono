const familiarContainer = document.querySelector("#familiar_container")

let familiarContent
websiteData.sections.forEach((section) => {
   if (section.name == "familiar") familiarContent = section.content
})

function buildFamiliar() {
   console.log("buildFamiliar")
   familiarContainer.innerHTML = ""
   familiarContent.timeline.forEach((example, index) => {
      const div = document.createElement("div")
      div.style.display = index != 0 ? "none" : "block"
      div.id = example.name
      div.dataset.name = example.name
      const svgContainer = document.createElement("div")
      svgContainer.innerHTML = familiarContent.svgs[example.name]
      const img = document.createElement("img")
      img.src = `/src/img/familiar/${example.src}`
      example.description.forEach((description) => {
         const p = document.createElement("p")
         p.textContent = description
         p.tabIndex = 0
         p.dataset.edit = "true"
         div.append(p)
      })
      const br = document.createElement("br")
      div.append(br, svgContainer)
      familiarContainer.append(div)
   })
}

function updateFamiliar(event, form) {
   console.log("updateFamiliar")
   buildFamiliar()
   const data = new FormData(form)
   let output = ""
   for (const entry of data) {
      output = entry[1]
   }
   familiarContent.timeline.forEach((example) => {
      const exampleContainer = familiarContainer.querySelector(`#${example.name}`)
      if (exampleContainer.dataset.name == output) {
         exampleContainer.style.display = "block"
      } else {
         exampleContainer.style.display = "none"
      }
   })
   event.preventDefault()
}
