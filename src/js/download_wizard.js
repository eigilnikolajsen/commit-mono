const downloadSettingsCustom = { weight: 450, italic: false, alternates: {}, features: {} }
const downloadSettingsDefault = { weight: 450, italic: false, alternates: {}, features: {} }
const fontFileBlobs = { regular: null, italic: null, bold: null, bolditalic: null }

let downloadStarted = false
async function downloadFont(kindOfDownload, button) {
    console.log("downloadFont")
    if (!downloadStarted) {
        downloadStarted = true
        button.classList.remove("loaded", "error")
        button.classList.add("loading")

        let allSettings = {}
        if (kindOfDownload === "dev") {
            allSettings.regular = { ...downloadSettingsCustom, style: "Regular" }
            allSettings.italic = {
                ...downloadSettingsCustom,
                style: "Italic",
                italic: true,
            }
            allSettings.bold = { ...downloadSettingsCustom, style: "Bold", weight: 700 }
            allSettings.bolditalic = {
                ...downloadSettingsCustom,
                style: "Bold Italic",
                italic: true,
                weight: 700,
            }
        }
        if (kindOfDownload === "default") {
            allSettings.regular = { ...downloadSettingsDefault, style: "Regular" }
            allSettings.italic = {
                ...downloadSettingsDefault,
                style: "Italic",
                italic: true,
            }
            allSettings.bold = { ...downloadSettingsDefault, style: "Bold", weight: 700 }
            allSettings.bolditalic = {
                ...downloadSettingsDefault,
                style: "Bold Italic",
                italic: true,
                weight: 700,
            }
        }
        if (kindOfDownload === "design") {
            for (let weight = 300; weight <= 700; weight += 25) {
                allSettings[weight + "Regular"] = {
                    ...downloadSettingsCustom,
                    style: weight + "Regular",
                    weight,
                    italic: false,
                }
                allSettings[weight + "Italic"] = {
                    ...downloadSettingsCustom,
                    style: weight + "Italic",
                    weight,
                    italic: true,
                }
            }
        }

        Promise.all(Object.values(allSettings).map((settings) => makeCustomFont(settings)))
            .then((resolve) => getZipFileBlob(kindOfDownload, resolve))
            .then((resolve) => initializeDownload(button, resolve))
            .catch((error) => catchError(button, error))
    }
}

function initializeDownload(button, blob) {
    downloadStarted = false
    button.classList.remove("loading")
    button.classList.add("loaded")
    // downloadFile(blob)
    saveFile(blob, "CommitMono.zip")
}
function catchError(button, error) {
    downloadStarted = false
    button.classList.remove("loading")
    button.classList.add("error")
    console.log(error)
}

function makeCustomFont(settings) {
    console.log("makeCustomFont")

    const fontBaseURL = "/src/fonts/"
    const fontName = "CommitMono" + versionOfCommitMono
    const fontWeight = settings.weight
    const fontItalic = settings.italic ? "Italic" : "Regular"
    const fontFilePath = `${fontBaseURL}${fontName}-${fontWeight}${fontItalic}.otf`
    // "/src/fonts/CommitMonoV129-450Italic.otf"

    return opentype
        .load(fontFilePath)
        .then((font) => {
            // ######################
            // #1 change alternates by switching their paths
            // the below loop does this
            // loop through the alternate settings
            Object.entries(settings.alternates).forEach(([alternate, active]) => {
                //
                // filter for only the active ones
                if (!active) return
                // console.log("alternate", alternate, "active", active)

                // look at all the fonts features
                font.tables.gsub.features.forEach((feature) => {
                    //
                    // if the feature matches the alternate we're currently on
                    if (feature.tag == alternate) {
                        // console.log("feature", feature)

                        // then loop through the list of lookup indexes of that feature
                        feature.feature.lookupListIndexes.forEach((lookupIndex) => {
                            // console.log("lookupIndex", lookupIndex)

                            // loop through the subtable of each lookup at the lookup index
                            font.tables.gsub.lookups[lookupIndex].subtables.forEach((subtable) => {
                                // console.log("subtable", subtable)

                                // loop through the glyphs of the subtable
                                subtable.coverage.glyphs.forEach((glyphIndexOriginal, index) => {
                                    //
                                    // glyphIndexOriginal is the index of the original glyph
                                    // glyphIndexSubstitute is the index of the glyph to substitute the original with
                                    const glyphIndexSubstitute = subtable.substitute[index]
                                    // console.log(
                                    //    "glyphIndexOriginal",
                                    //    glyphIndexOriginal,
                                    //    "glyphIndexSubstitute",
                                    //    glyphIndexSubstitute
                                    // )

                                    // get the paths for the original and the substitute glyph
                                    const glyphPathOriginal = font.glyphs.glyphs[glyphIndexOriginal].path
                                    const glyphPathSubstitute = font.glyphs.glyphs[glyphIndexSubstitute].path

                                    // swap the paths, so the original glyph gets the path of the substitute and vice versa
                                    font.glyphs.glyphs[glyphIndexOriginal].path = glyphPathSubstitute
                                    font.glyphs.glyphs[glyphIndexSubstitute].path = glyphPathOriginal
                                })
                            })
                        })
                    }
                })
            })

            // ######################
            // #2 put active features into calt
            // create empty "calt" feature to store the feature
            const emptyCalt = { tag: "calt", feature: { featureParams: 0, lookupListIndexes: [] } }
            font.tables.gsub.features.push(emptyCalt)

            // create the empty array that is to be the lookup indexes for the calt feature
            const caltLookupIndexes = []

            // once again, loop through the alternate settings (feature settings)
            Object.entries(settings.features).forEach(([alternate, active]) => {
                //
                // filter for only the active ones
                if (!active) return
                // console.log("alternate", alternate, "active", active)

                // then loop through all features
                font.tables.gsub.features.forEach((feature) => {
                    //
                    // and find the ones that match the active tags
                    if (feature.tag == alternate) {
                        // console.log("feature", feature)

                        // push the lookup indexes into the empty caltLookupIndexes variable
                        feature.feature.lookupListIndexes.forEach((lookupIndex) => caltLookupIndexes.push(lookupIndex))
                    }
                })

                // once more loop through all features
                font.tables.gsub.features.forEach((feature) => {
                    //
                    // when the calt feature is reached (it's the last one)
                    if (feature.tag === "calt") {
                        //
                        // set its lookup indexes to the variable
                        feature.feature.lookupListIndexes = caltLookupIndexes
                        // console.log("caltLookupIndexes", caltLookupIndexes)
                    }
                })
            })

            // garbage code that adds a single number to a specific array in the gsub table
            // like this [0, 1, 2, 3, 4] => [0, 1, 2, 3, 4, 5]
            font.tables.gsub.scripts.forEach((script) =>
                script.script.defaultLangSys.featureIndexes.push(script.script.defaultLangSys.featureIndexes.length)
            )

            // remove unsupported lookup type
            // font.tables.gsub.lookups = font.tables.gsub.lookups.filter((l) => l.lookupType != 7)

            // ######################
            // #3 change the names
            // give custom names to each member of the style group
            font.names.fontFamily.en = "CommitMono"
            font.names.fontSubfamily.en = settings.style
            font.names.fullName.en = `CommitMono ${settings.style}`
            font.names.postScriptName.en = `CommitMono-${settings.style.split(" ").join("")}`
            delete font.names.preferredFamily
            delete font.names.preferredSubfamily
            font.names.uniqueID.en = `Version 1.001;;CommitMono-${settings.style.split(" ").join("")};2023;FL801`

            font.tables.cff.topDict.familyName = font.names.fontFamily.en
            font.tables.cff.topDict.fullName = font.names.fullName.en
            font.tables.cff.topDict.weight = settings.weight == 700 ? "Bold" : "Regular"

            const macStyles = ["Regular", "Italic", "Bold", "Bold Italic"]
            font.tables.head.macStyle = macStyles.indexOf(settings.style)

            // make the font.tables.name equal to that of font.names
            font.tables.name = font.names

            // set the correct weight
            font.tables.os2.usWeightClass = settings.weight

            console.log(font)

            const fontAB = font.toArrayBuffer()
            const fontBlob = new Blob([fontAB], { type: "font/otf" })

            return { weight: settings.weight, style: fontItalic, blob: fontBlob }
        })
        .catch((err) => {
            return err
        })
}

async function getZipFileBlob(kindOfDownload, fonts) {
    console.log(fontFileBlobs, fonts)

    const { BlobWriter, BlobReader, HttpReader, ZipWriter } = zip
    const zipFileWriter = new BlobWriter()
    const zipWriter = new ZipWriter(zipFileWriter)

    await Promise.all([
        ...fonts.map((font) => zipWriter.add(`CommitMono-${font.weight}-${font.style}.otf`, new BlobReader(font.blob))),
        kindOfDownload === "design" &&
            zipWriter.add(
                "CommitMono VariableFont.ttf",
                new HttpReader(`/src/fonts/CommitMono${versionOfCommitMono}-VF.ttf`)
            ),
        kindOfDownload === "design" &&
            zipWriter.add(
                "CommitMono VariableFont.woff2",
                new HttpReader(`/src/fonts/CommitMono${versionOfCommitMono}-VF.woff2`)
            ),
        zipWriter.add("installation.txt", new HttpReader("/src/txt/installation.txt")),
        zipWriter.add("license.txt", new HttpReader("/src/txt/license.txt")),
    ])
    const zipFileBlob = await zipWriter.close()
    return zipFileBlob
}

function downloadFile(blob) {
    const a = document.createElement("a")
    a.download = `CommitMono.zip`
    a.href = URL.createObjectURL(blob)
    a.click()
}
function saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
        const a = document.createElement("a")
        document.body.appendChild(a)
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = filename
        a.click()
        setTimeout(() => {
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        }, 0)
    }
}
