const exampleForm = document.querySelector("#examples_form")
const exampleSettingsForm = document.querySelector("#examplesettings_form")
const weightForm = document.querySelector("#weight_form")
const letterSpacingForm = document.querySelector("#letter_spacing_form")
const lineHeightForm = document.querySelector("#line_height_form")
const fontNameForm = document.querySelector("#font_name_form")
const exampleFieldset = document.querySelector("#examples_form fieldset")
const fontsFieldset = document.querySelector("#fonts_form fieldset")
const weightFieldset = document.querySelector("#weight_form fieldset")
const letterSpacingFieldset = document.querySelector("#letter_spacing_form fieldset")
const lineHeightFieldset = document.querySelector("#line_height_form fieldset")
const alternatesContainer = document.querySelector("#alternates_container")
const featuresContainer = document.querySelector("#features_container")

function buildExample() {
    // console.log("buildExample")
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
                if (weight == 400) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = weight
                label.setAttribute("for", `weight_${weight}`)
                div.append(input, label)
                weightFieldset.append(div)
            })

            letterSpacingFieldset.innerHTML = ""
            const ls = section.content.letterSpacings
            for (let value = ls.min; value <= ls.max; value += ls.step) {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "letterSpacing"
                input.id = `letter_spacing_${value}`
                input.classList.add("example_letter_spacing")
                input.value = value
                input.dataset.forform = "letter_spacing_form"
                if (value == ls.value) input.setAttribute("checked", "true")
                const label = document.createElement("label")
                label.textContent = `${value}%`
                label.setAttribute("for", `letter_spacing_${value}`)
                div.append(input, label)
                letterSpacingFieldset.append(div)
            }

            lineHeightFieldset.innerHTML = ""
            const lh = section.content.lineHeights
            for (let val = lh.min; val <= lh.max + 0.01; val += lh.step) {
                const value = Math.round(val * 1000) / 1000
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "lineHeight"
                input.id = `line_height_${value}`
                input.classList.add("example_line_height")
                input.value = value
                input.dataset.forform = "line_height_form"
                if (value == lh.value) input.setAttribute("checked", "true")
                const label = document.createElement("label")
                label.textContent = value
                label.setAttribute("for", `line_height_${value}`)
                div.append(input, label)
                lineHeightFieldset.append(div)
            }

            featuresContainer.innerHTML = ""
            alternatesContainer.innerHTML = ""
            section.content.features.forEach((feature, index) => {
                const fieldset = document.createElement("fieldset")
                const duo = [0, 0]
                const p = document.createElement("p")
                p.textContent = `${feature.feature}: ${feature.label}`
                p.id = `alt_${feature.name}`
                fieldset.append(p)
                duo.forEach((_, index) => {
                    const div = document.createElement("div")
                    const input = document.createElement("input")
                    input.type = "radio"
                    input.name = feature.name
                    input.id = `${feature.feature}_${!!index}`
                    input.value = `'${feature.feature}' ${index == 0 ? "off" : "on"}`
                    input.dataset.forform = "examplesettings_form"
                    if (!feature.on && index == 0) input.setAttribute("checked", "true")
                    if (feature.on && index == 1) input.setAttribute("checked", "true")
                    const label = document.createElement("label")
                    if (feature.type == "feature") label.textContent = index == 0 ? "OFF" : "ON"
                    if (feature.type == "alternate") label.textContent = index == 0 ? "DEF" : "ALT"
                    label.setAttribute("for", `${feature.feature}_${!!index}`)
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
    // console.log("updateExamples")
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
    // console.log("updateFont")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }

    if (output !== "CommitMono") codeExample.style.fontFeatureSettings = "normal"
    else codeExample.style.fontFeatureSettings = [...new FormData(exampleSettingsForm).values()].join(", ")

    let fontInDocument = false
    document.fonts.forEach((font) => (font.family == output ? (fontInDocument = true) : null))

    if (!fontInDocument) {
        const input = document.querySelector(`input[value="${output}"]`)
        input.classList.add("loading_font")
        const outputFont = new FontFace(output, `url(/src/fonts/other/${output}.woff2)`, {
            style: "normal",
            weight: "400",
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
    // console.log("updateWeight")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = +entry[1]
    }

    downloadSettingsCustom.weight = output
    websiteData.weight = output
    document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
        websiteData.italic ? "1" : "0"
    }`

    console.log(downloadSettingsCustom)

    if (event) event.preventDefault()
}

function updateLetterSpacing(event, form) {
    // console.log("updateWeight")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = +entry[1]
    }
    downloadSettingsCustom.letterSpacing = output
    websiteData.letterSpacing = output
    codeExample.style.letterSpacing = `${output / 100}em`

    if (event) event.preventDefault()
}

function updateLineHeight(event, form) {
    // console.log("updateWeight")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = +entry[1]
    }
    downloadSettingsCustom.lineHeight = output
    websiteData.lineHeight = output
    codeExample.style.lineHeight = output

    if (event) event.preventDefault()
}

function updateFontName(event, form) {
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = entry[1]
    }
    const customName = document.querySelector("#custom_name")
    const suffix = output ? output : ""
    const regex = /^[\w-_]*$/
    const label = document.querySelector("#font_name + p")
    if (output.match(regex)) {
        downloadSettingsCustom.fontName = output
        label.textContent = "✓ Valid name."
        customName.textContent = `CommitMono${suffix}`
        websiteData.fontName = `CommitMono${suffix}`
    } else {
        downloadSettingsCustom.fontName = ""
        label.textContent = "✕ Invalid name, use: A-z 0-9 _ -"
        customName.textContent = `CommitMonoYourName`
        websiteData.fontName = `CommitMono`
    }

    if (event) event.preventDefault()
}

function updateExampleSettings(event, form, isDefault) {
    // console.log("updateExampleSettings")
    const data = new FormData(form)
    let output = ""
    function updateDownloadSettings(type, feature) {
        const key = feature.split("' ")[0].slice(1)
        const value = feature.split("' ")[1] == "on"
        downloadSettingsCustom[type][key] = value
        if (isDefault) downloadSettingsDefault[type][key] = value
    }
    for (const entry of data) {
        output += `${entry[1]}, `
        if (entry[1].includes("cv")) updateDownloadSettings("alternates", entry[1])
        if (entry[1].includes("ss")) updateDownloadSettings("features", entry[1])

        const label = document.querySelector(`#alt_${entry[0]}`)
        if (label) label.style.fontFeatureSettings = entry[1]
    }
    output = output.slice(0, -2)

    const currentFont = [...new FormData(document.forms["fonts_form"]).values()][0]
    if (currentFont === "CommitMono") codeExample.style.fontFeatureSettings = output
    else codeExample.style.fontFeatureSettings = "normal"

    const customFeatureCode = document.querySelector("#custom_feature_code")
    const shortFeatureCode = output
        .split(", ")
        .filter((f) => f.includes("on"))
        .join(", ")
    customFeatureCode.textContent = `"${shortFeatureCode}"`

    if (event) event.preventDefault()
}

function areObjectsIdentical(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

async function uploadCustomSettings(event, fileInput) {
    event.stopPropagation()
    event.preventDefault()

    const file = fileInput.files[0]
    const fileType = file?.name.split(".").pop()

    if (fileType == "json") {
        const fileText = await file.text()
        const uploadedSettings = JSON.parse(fileText)
        updateCustomSettings(uploadedSettings)
    }
}

function updateCustomSettings(settings) {
    if (settings.weight) {
        document.forms["weight_form"][`weight_${settings.weight}`].checked = true
        updateWeight(null, weightForm)
    }
    if (settings.letterSpacing) {
        document.forms["letter_spacing_form"][`letter_spacing_${settings.letterSpacing}`].checked = true
        updateLetterSpacing(null, letterSpacingForm)
    }
    if (settings.lineHeight) {
        document.forms["line_height_form"][`line_height_${settings.lineHeight}`].checked = true
        updateLineHeight(null, lineHeightForm)
    }
    if (settings.alternates) {
        Object.entries(settings.alternates).forEach(([feature, enabled]) => {
            document.forms["examplesettings_form"][`${feature}_${enabled}`].checked = true
        })
        updateExampleSettings(null, exampleSettingsForm, false)
    }
}

const customSettingsInput = document.querySelector("#custom-settings-input")
customSettingsInput.addEventListener("click", () => {
    enterTextField()
    customSettingsInput.value = ""
})
customSettingsInput.addEventListener("blur", exitTextField)
customSettingsInput.addEventListener("input", (e) => {
    enterTextField()
    try {
        const pastedText = JSON.parse(e.target.value)
        updateCustomSettings(pastedText)
        customSettingsInput.value = "[Imported ✓]"
        setTimeout(() => (customSettingsInput.value = ""), 1500)
    } catch (error) {
        if (customSettingsInput.value.includes("[Error ✕")) customSettingsInput.value = ""
        else if (!customSettingsInput.value.includes("[Imported ✓]")) {
            customSettingsInput.value = "[Error ✕]"
            setTimeout(() => (customSettingsInput.value = ""), 1500)
        }
    }
})

const copyCustomSettings = document.querySelector("#copy-custom-settings")
copyCustomSettings.addEventListener("click", () => {
    if (navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(downloadSettingsCustom))
    const text = copyCustomSettings.textContent
    copyCustomSettings.textContent = "[Copied ✓]"
    setTimeout(() => (copyCustomSettings.textContent = text), 1500)
})
