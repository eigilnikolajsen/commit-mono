function fillSectionData() {
    // console.log("fillSectionData")
    websiteData.sections.forEach((section, index) => {
        const topContainer = document.querySelector(`#section_${index + 1} .top_container`)
        if (topContainer) {
            const h1 = document.createElement("h1")
            h1.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
            h1.tabIndex = 0
            h1.dataset.edit = "true"
            const br = document.createElement("br")
            const p = document.createElement("p")
            p.innerHTML = section.description
            p.tabIndex = 0
            p.dataset.edit = "true"
            topContainer.append(h1, br, p)
        }
    })
}
