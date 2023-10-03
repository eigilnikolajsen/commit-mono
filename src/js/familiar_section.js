const familiarContainer = document.querySelector("#familiar_container")

function buildFamiliar() {
    // console.log("buildFamiliar")
    websiteData.sections.forEach((section) => {
        if (section.name == "familiar") {
            familiarContainer.innerHTML = ""
            section.content.timeline.forEach((example, index) => {
                const div = document.createElement("div")
                div.style.display = example.name == "commit_mono_example" ? "block" : "none"
                div.id = example.name
                div.dataset.name = example.name
                const svgContainer = document.createElement("div")
                svgContainer.innerHTML = section.content.svgs[example.name]
                svgContainer.tabIndex = 0
                svgContainer.classList.add("svg_container")
                const img = document.createElement("img")
                img.src = `/src/img/familiar/${example.src}`
                const p = document.createElement("p")
                p.tabIndex = 0
                p.dataset.edit = "true"
                example.description.forEach((description) => (p.textContent += description + " "))
                div.append(p)
                const br = document.createElement("br")
                div.append(br, svgContainer)
                familiarContainer.append(div)
            })
        }
    })
}

function updateFamiliar(event, form) {
    // console.log("updateFamiliar")
    buildFamiliar()
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = entry[1]
    }
    websiteData.sections.forEach((section) => {
        if (section.name == "familiar") {
            section.content.timeline.forEach((example) => {
                const exampleContainer = familiarContainer.querySelector(`#${example.name}`)
                if (exampleContainer.dataset.name == output) {
                    exampleContainer.style.display = "block"
                } else {
                    exampleContainer.style.display = "none"
                }
            })
        }
    })
    event.preventDefault()
}
