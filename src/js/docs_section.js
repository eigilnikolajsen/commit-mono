const docsForm = document.querySelector("#docs_form")
const faqContainerDocs = document.querySelector("#faq_container_docs")
const featuresContainerDocs = document.querySelector("#features_container_docs")
const alternatesContainerDocs = document.querySelector("#alternates_container_docs")
const charsetContainerDocs = document.querySelector("#charset_container_docs")
const languageContainerDocs = document.querySelector("#language_container_docs")

let customizeContent
let docsContent
websiteData.sections.forEach((section) => {
    if (section.name == "customize") customizeContent = section.content
    if (section.name == "docs") docsContent = section.content
})

function buildDocs() {
    // console.log("buildDocs")
    customizeContent.features.forEach((feature) => {
        const sizes = [
            [3, 4],
            [1.5, 2],
            [0.5, 1],
        ]
        const container = document.createElement("div")
        const h2 = document.createElement("h2")
        const featureDescriptionWithSpan = feature.description
            .split("|")
            .map((l) =>
                l == "OFF" || l == "DEF"
                    ? `<span class="span_off${
                          !feature.on ? " active_feature" : ""
                      }" onclick="changeFeatureDocs('disable')">[${l}]</span>`
                    : l == "ON" || l == "ALT"
                    ? `<span class="span_on${
                          feature.on ? " active_feature" : ""
                      }" onclick="changeFeatureDocs('enable')">[${l}]</span>`
                    : l,
            )
            .join("")
        h2.innerHTML = featureDescriptionWithSpan
        h2.tabIndex = 0
        h2.dataset.edit = "true"
        const p = document.createElement("p")
        p.textContent = `Default: ${feature.on ? "ON" : "OFF"}. Feature in variable font: "${feature.feature}".`
        container.append(h2, p)
        sizes.forEach((size) => {
            const exampleText = document.createElement("p")
            exampleText.textContent = feature.docsExample
            exampleText.classList.add("docs_example", `docs_${feature.type}`)
            exampleText.dataset.feature = feature.feature
            exampleText.style.fontSize = `${size[0]}rem`
            exampleText.style.lineHeight = `${size[1]}rem`
            container.append(exampleText)
        })
        const br1 = document.createElement("br")
        const br2 = document.createElement("br")
        container.append(br1, br2)
        if (feature.type == "feature") {
            featuresContainerDocs.append(container)
        }
        if (feature.type == "alternate") {
            alternatesContainerDocs.append(container)
        }
    })
    const charset = document.querySelector("#charset")
    const tunedCharset = docsContent.charset.split("").join(" ")
    docsContent.charset.split("").forEach((char) => {
        const span = document.createElement("p")
        span.classList.add("charset_letter")
        span.textContent = char
        charset.append(span)
    })
    // charset.textContent = tunedCharset

    const languageSupport = document.querySelector("#language_support")
    docsContent.supportedLanguages.forEach((language) => {
        const p = document.createElement("p")
        p.classList.add("language_support")
        p.textContent = language
        languageSupport.append(p)
    })

    updateDocs(null, docsForm)
}

function changeFeatureDocs(enable) {
    // console.log("changeFeatureDocs")
    if (enable == "enable") {
        websiteData.enableFeaturesInDocs = true
    } else if (enable == "disable") {
        websiteData.enableFeaturesInDocs = false
    } else if (enable == "switch") {
        websiteData.enableFeaturesInDocs = !websiteData.enableFeaturesInDocs
    }
    const enabled = websiteData.enableFeaturesInDocs
    const allExampleTexts = document.querySelectorAll(".docs_example")
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

function updateDocs(event, form) {
    // console.log("updateDocs")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = entry[1]
    }
    const docsContainers = document.querySelectorAll(".docs_container")
    docsContainers.forEach((topic) => {
        // console.log(topic.id)
        topic.style.display = "none"
        if (`${output}_container_docs` == topic.id) {
            topic.style.display = "block"
        }
    })
    if (event) event.preventDefault()
}
