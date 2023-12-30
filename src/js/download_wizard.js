const downloadSettingsCustom = {
    weight: 400,
    italic: false,
    alternates: {},
    features: {},
    letterSpacing: 0,
    lineHeight: 1,
}
const downloadSettingsDefault = {
    weight: 400,
    italic: false,
    alternates: {},
    features: {},
    letterSpacing: 0,
    lineHeight: 1,
}
const fontFileBlobs = { regular: null, italic: null, bold: null, bolditalic: null }

let downloadStarted = false
async function downloadFont(kindOfDownload, button) {
    // console.log("downloadFont")

    // detect safari
    const userAgentString = navigator.userAgent || "."
    let usingChrome = userAgentString.indexOf("Chrome") > -1 || false
    let usingSafari = userAgentString.indexOf("Safari") > -1 || false
    if (usingChrome && usingSafari) usingSafari = false

    // block download if from Safari since zip is corrupted
    if (usingSafari) {
        button.classList.remove("loaded", "error", "safari")
        button.classList.add("loading")
        setTimeout(() => {
            button.classList.remove("loading")
            button.classList.add("safari")
        }, 500)
    } else {
        if (!downloadStarted) {
            downloadStarted = true
            button.classList.remove("loaded", "error", "safari")
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
                for (let weight = 200; weight <= 700; weight += 25) {
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
}

function initializeDownload(button, blob) {
    downloadStarted = false
    button.classList.remove("loading")
    button.classList.add("loaded")
    saveFile(blob, `${websiteData.fontName}${versionOfCommitMono}.zip`)
}
function catchError(button, error) {
    downloadStarted = false
    button.classList.remove("loading")
    button.classList.add("error")
    console.log(error)
}

async function makeCustomFont(settings) {
    const fontBaseURL = "/src/fonts/fontlab/"
    const fontName = "CommitMono" + versionOfCommitMono
    const fontWeight = settings.weight
    const fontItalic = settings.italic ? "Italic" : "Regular"
    const fontFilePath = `${fontBaseURL}${fontName}-${fontWeight}${fontItalic}.otf`
    // "/src/fonts/fontlab/CommitMonoV132-400Italic.otf"

    return fetch(fontFilePath)
        .then((file) => file.arrayBuffer())
        .then((font) => opentype.parse(font))
        .then((font) => {
            // ######################
            // #1 change alternates by switching their paths
            // the below loop does this
            // loop through the alternate settings
            Object.entries(settings.alternates)
                .reverse() // to make the alt g override the italic g
                .forEach(([alternate, active]) => {
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

                                    // find the base glyphs
                                    let glyphs = []

                                    // get glyphs from glyphs array
                                    if (subtable.coverage.format == 1) {
                                        glyphs = subtable.coverage.glyphs
                                    }

                                    // get glyphs from ranges
                                    if (subtable.coverage.format == 2) {
                                        // [{start: 0, end: 4}, {start: 8, end: 8}] => [0, 1, 2, 3, 4, 8]
                                        glyphs = subtable.coverage.ranges
                                            .map((range) =>
                                                Array.from(Array(range.end - range.start + 1)).map(
                                                    (_, index) => range.start + index
                                                )
                                            )
                                            .flat()
                                    }

                                    // loop through the glyphs of the subtable
                                    glyphs.forEach((glyphIndexOriginal, index) => {
                                        //
                                        // glyphIndexOriginal is the index of the original glyph
                                        // glyphIndexSubstitute is the index of the glyph to substitute the original with
                                        const glyphIndexSubstitute = subtable.substitute[index]

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

            // change width
            const defaultWidth = 600
            const newWidth = defaultWidth + websiteData.letterSpacing * 10
            const newWidthDecrease = websiteData.letterSpacing * 10
            const newWidthMoveAmount = websiteData.letterSpacing * 5
            Object.values(font.glyphs.glyphs).forEach((glyph) => {
                glyph.path.commands.forEach((command) => {
                    if (command.type === "M" || command.type === "L") {
                        command.x += newWidthMoveAmount
                    }
                    if (command.type === "C") {
                        command.x += newWidthMoveAmount
                        command.x1 += newWidthMoveAmount
                        command.x2 += newWidthMoveAmount
                    }
                })
                glyph.leftSideBearing += newWidthMoveAmount
                glyph.advanceWidth = newWidth
            })
            font.defaultWidthX = newWidth
            font.tables.cff.topDict._defaultWidthX = newWidth
            font.tables.cff.topDict._privateDict.defaultWidthX = newWidth
            font.tables.head.yMax += newWidthMoveAmount
            font.tables.head.yMin += newWidthMoveAmount
            font.tables.hhea.advanceWidthMax = newWidth
            font.tables.hhea.minLeftSideBearing += newWidthMoveAmount
            font.tables.hhea.minRightSideBearing += newWidthMoveAmount
            font.tables.hhea.xMaxExtent += newWidthDecrease
            font.tables.os2.xAvgCharWidth = newWidth

            // change height
            const newHeightOffset = websiteData.lineHeight * 500 - 500
            font.ascender += newHeightOffset
            font.descender -= newHeightOffset
            font.tables.hhea.ascender += newHeightOffset
            font.tables.hhea.descender -= newHeightOffset
            font.tables.os2.sTypoAscender += newHeightOffset
            font.tables.os2.sTypoDescender -= newHeightOffset
            font.tables.os2.usWinAscent += newHeightOffset
            font.tables.os2.usWinDescent += newHeightOffset // this is correct since this value is positive

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
                // // console.log("alternate", alternate, "active", active)

                // then loop through all features
                font.tables.gsub.features.forEach((feature) => {
                    //
                    // and find the ones that match the active tags
                    if (feature.tag == alternate) {
                        // // console.log("feature", feature)

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
                        // // console.log("caltLookupIndexes", caltLookupIndexes)
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

            const { style, weight } = settings
            const { fontName } = websiteData
            const styleNoSpace = style.split(" ").join("")
            const fontFamily = fontName
            const fullName = `${fontName} ${style}`
            const postScriptName = `${fontName}-${styleNoSpace}`
            const uniqueID = `${font.names.windows.version.en};;${fontName}-${styleNoSpace};2023;FL820`

            font.names.macintosh.fontFamily.en = fontFamily
            font.names.macintosh.fontSubfamily.en = style
            font.names.macintosh.fullName.en = fullName
            font.names.macintosh.postScriptName.en = postScriptName
            font.names.macintosh.preferredFamily = fontFamily
            font.names.macintosh.preferredSubfamily = style

            font.names.windows.fontFamily.en = fontFamily
            font.names.windows.fontSubfamily.en = style
            font.names.windows.fullName.en = fullName
            font.names.windows.postScriptName.en = postScriptName
            font.names.windows.preferredFamily = fontFamily
            font.names.windows.preferredSubfamily = style
            font.names.windows.uniqueID.en = uniqueID

            font.tables.cff.topDict.familyName = fontFamily
            font.tables.cff.topDict.fullName = fullName
            font.tables.cff.topDict.weight = weight == 700 ? "Bold" : "Regular"
            font.tables.cff.topDict.uniqueId = uniqueID

            // set correct mac style
            const macStyles = ["Regular", "Bold", "Italic", "Bold Italic"]
            font.tables.head.macStyle = macStyles.indexOf(style)

            // set correct numberOfHMetrics (3 is monospace)
            font.tables.hhea.numberOfHMetrics = 3

            // set correct isFixedPitch in CFF and POST tables (1 is monospace)
            font.tables.cff.topDict.isFixedPitch = 1
            font.tables.post.isFixedPitch = 1

            // make the font.tables.name equal to that of font.names
            font.tables.name = font.names

            // set the correct weight
            font.tables.os2.usWeightClass = weight

            // set the weight and italic
            let fsSelection = 0
            fsSelection += style.includes("Italic") ? Math.pow(2, 0) : 0
            fsSelection += style.includes("Bold") ? Math.pow(2, 5) : 0
            font.tables.os2.fsSelection = fsSelection

            const fontAB = font.toArrayBuffer()
            const blob = new Blob([fontAB], { type: "font/otf" })

            return { weight, style: fontItalic, blob }
        })
        .catch((err) => err)
}

async function getZipFileBlob(kindOfDownload, fonts) {
    // console.log(fontFileBlobs, fonts)

    const { BlobWriter, BlobReader, HttpReader, ZipWriter, TextReader } = zip
    const zipFileWriter = new BlobWriter()
    const zipWriter = new ZipWriter(zipFileWriter)

    await Promise.all([
        ...fonts.map((font) =>
            zipWriter.add(`${websiteData.fontName}-${font.weight}-${font.style}.otf`, new BlobReader(font.blob))
        ),
        kindOfDownload === "design" &&
            zipWriter.add(
                "CommitMono VariableFont.ttf",
                new HttpReader(`/src/fonts/fontlab/CommitMono${versionOfCommitMono}-VF.ttf`)
            ),
        kindOfDownload === "design" &&
            zipWriter.add(
                "CommitMono VariableFont.woff2",
                new HttpReader(`/src/fonts/fontlab/CommitMono${versionOfCommitMono}-VF.woff2`)
            ),
        zipWriter.add("installation.txt", new HttpReader("/src/txt/installation.txt")),
        zipWriter.add("custom-settings.json", new TextReader(JSON.stringify(downloadSettingsCustom))),
        zipWriter.add("license.txt", new HttpReader("/src/txt/license.txt")),
    ])
    const zipFileBlob = await zipWriter.close()
    return zipFileBlob
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
