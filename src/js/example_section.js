const exampleForm = document.querySelector("#examples_form")
const exampleSettingsForm = document.querySelector("#examplesettings_form")
const weightForm = document.querySelector("#weight_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")
const fontsFieldset = document.querySelector("#fonts_form fieldset")
const weightFieldset = document.querySelector("#weight_form fieldset")
const alternatesContainer = document.querySelector("#alternates_container")
const featuresContainer = document.querySelector("#features_container")

function buildExample() {
    consol.log("buildExample")
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
                input.value = font.cssName
                input.dataset.forform = "fonts_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
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
                input.dataset.forform = "examples_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
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
                input.dataset.forform = "weight_form"
                // input.tabIndex = 0
                if (index == 6) {
                    input.setAttribute("checked", "true")
                }
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
                duo.forEach((_, index) => {
                    const div = document.createElement("div")
                    const input = document.createElement("input")
                    input.type = "radio"
                    input.name = feature.name
                    input.id = `${feature.name}${index}`
                    input.value = `'${feature.feature}' ${index == 0 ? "off" : "on"}`
                    input.dataset.forform = "examplesettings_form"
                    // input.tabIndex = 0
                    if (!feature.on && index == 0) input.setAttribute("checked", "true")
                    if (feature.on && index == 1) input.setAttribute("checked", "true")
                    const label = document.createElement("label")
                    if (feature.type == "feature") label.textContent = index == 0 ? "OFF" : "ON"
                    if (feature.type == "alternate") label.textContent = index == 0 ? "DEF" : "ALT"
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
    updateExampleSettings(null, exampleSettingsForm, true)
}

const codeExample = document.querySelector("#code_example")
function updateExamples(event, form) {
    consol.log("updateExamples")
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
    consol.log("updateFont")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }

    let fontInDocument = false
    document.fonts.forEach((font) => (font.family == output ? (fontInDocument = true) : null))

    if (!fontInDocument) {
        const input = document.querySelector(`input[value="${output}"]`)
        input.classList.add("loading_font")
        const outputFont = new FontFace(output, `url(/src/fonts/other/${output}.woff2)`, {
            style: "normal",
            weight: "450",
        })
        document.fonts.add(outputFont)
        outputFont.load()
        document.fonts.ready.then(() => {
            codeExample.style.fontFamily = output
            input.classList.remove("loading_font")
        })
    } else {
        codeExample.style.fontFamily = output
    }

    if (event) event.preventDefault()
}

function updateWeight(event, form) {
    consol.log("updateWeight")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = +entry[1]
    }

    fontDownloadSettings.weight = output
    websiteData.weight = output
    document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
        websiteData.italic ? "1" : "0"
    }`
    downloadButton.textContent = areObjectsIdentical(fontDownloadSettings, fontDownloadSettingsDefault)
        ? "Download Commit Mono (default settings)"
        : "Download Commit Mono (custom settings)"

    consol.log(fontDownloadSettings)

    if (event) event.preventDefault()
}

function updateExampleSettings(event, form, isDefault) {
    consol.log("updateExampleSettings")
    const data = new FormData(form)
    let output = ""
    function updateDownloadSettings(type, feature) {
        const key = feature.split("' ")[0].slice(1)
        const value = feature.split("' ")[1] == "on"
        fontDownloadSettings[type][key] = value
        if (isDefault) fontDownloadSettingsDefault[type][key] = value
    }
    for (const entry of data) {
        output += `${entry[1]}, `
        if (entry[1].includes("cv")) updateDownloadSettings("alternates", entry[1])
        if (entry[1].includes("ss")) updateDownloadSettings("features", entry[1])

        const label = document.querySelector(`#alt_${entry[0]}`)
        if (label) label.style.fontFeatureSettings = entry[1]
    }
    consol.log(fontDownloadSettings)
    const codeExample = document.querySelector("#code_example")
    codeExample.style.fontFeatureSettings = output.slice(0, -2)

    downloadButton.textContent = areObjectsIdentical(fontDownloadSettings, fontDownloadSettingsDefault)
        ? "Download Commit Mono (default settings)"
        : "Download Commit Mono (custom settings)"

    if (event) event.preventDefault()
}

function areObjectsIdentical(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}
