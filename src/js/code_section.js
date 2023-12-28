const codeForm = document.querySelector("#code_form")
const codeFieldset = document.querySelector("#code_form fieldset")
const codeDescription = document.querySelector("#code_description")

function buildCode() {
    // console.log("buildCode")
    websiteData.sections.forEach((section) => {
        if (section.name == "code") {
            section.content.characters.forEach((character, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "code"
                input.id = character.name
                input.classList.add("code_character")
                input.value = character.name
                input.dataset.forform = "code_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = character.value
                label.setAttribute("for", character.name)
                div.append(input, label)
                codeFieldset.append(div)

                const p = document.createElement("p")
                p.tabIndex = 0
                p.dataset.edit = "true"
                p.classList.add("code_char")
                p.dataset.char = character.name
                p.textContent = character.description
                p.style.display = "none"
                codeDescription.append(p)
            })
        }
    })
}

let commitMonoFont
async function updateCodeFont() {
    // console.log("updateCodeFont")
    opentype
        .load(
            `/src/fonts/fontlab/CommitMono${versionOfCommitMono}-${websiteData.weight}${
                websiteData.italic ? "Italic" : "Regular"
            }.otf`
        )
        .then((font) => {
            // // console.log(font)
            commitMonoFont = font
            updateCode(null, codeForm)
        })
        .catch((err) => console.log(err))

    //     Promise.all([
    //         opentype.load("src/fonts/other/CascadiaCode-Regular.otf"),
    //         opentype.load("src/fonts/other/CascadiaCode-Italic.otf"),
    //         opentype.load("src/fonts/other/CascadiaCode-Bold.otf"),
    //         opentype.load("src/fonts/other/CascadiaCode-BoldItalic.otf"),
    //         opentype.load("src/fonts/other/CommitMono-400-Regular.otf"),
    //         opentype.load("src/fonts/other/CommitMono-400-Italic.otf"),
    //         opentype.load("src/fonts/other/CommitMono-700-Regular.otf"),
    //         opentype.load("src/fonts/other/CommitMono-700-Italic.otf"),
    //     ]).then((res) => {
    //         res.forEach((font) => {
    //             const { fontFamily, fontSubfamily, fullName, postScriptName } = font.names.windows
    //             console.log(`
    // fontFamily: ${fontFamily?.en}
    // fontSubfamily: ${fontSubfamily?.en}
    // fullName: ${fullName?.en}
    // postScriptName: ${postScriptName?.en}`)
    //         })
    //     })
}

function updateCode(event, form) {
    // console.log("updateCode")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }

    let displayCharacter = ""
    let displayName = ""
    websiteData.sections.forEach((section) => {
        if (section.name == "code") {
            section.content.characters.forEach((character, index) => {
                if (character.name == output) {
                    displayCharacter = character.value
                    displayName = character.name
                    const ps = document.querySelectorAll(".code_char")
                    ps.forEach((p) =>
                        p.dataset.char == character.name ? (p.style.display = "block") : (p.style.display = "none")
                    )
                }
            })
        }
    })

    let selectedGlyphData
    if (commitMonoFont) {
        Object.values(commitMonoFont.glyphs.glyphs).forEach((glyph) => {
            if (glyph.name == output) selectedGlyphData = glyph
        })
        updateCanvas(selectedGlyphData, commitMonoFont, displayCharacter, displayName)
    }

    if (event) event.preventDefault()
}

const canvasScale = 16

const drawFontLine = (GLYPH_SCALE, ctx, upem, width, name, value, yOffset) => {
    let scaledValue = mapRange(value, 0, upem, 0, width * GLYPH_SCALE)
    scaledValue = width - scaledValue + (yOffset * GLYPH_SCALE * width) / upem

    ctx.strokeStyle = getCssVar("--text")
    ctx.beginPath()
    ctx.moveTo(7 * canvasScale, scaledValue)
    ctx.lineTo(width - 7 * canvasScale, scaledValue)
    ctx.closePath()
    ctx.stroke()

    ctx.fillStyle = getCssVar("--text")
    ctx.font = `${0.75 * canvasScale}px "CommitMono"`
    ctx.textAlign = "left"
    ctx.fillText(name, 0, scaledValue + 0.25 * canvasScale)
    ctx.textAlign = "left"
    ctx.fillText(value, width - 4 * canvasScale, scaledValue + 0.25 * canvasScale)
}
const drawFontLineVertical = (GLYPH_SCALE, ctx, upem, width, value, yOffset, ascender, descender) => {
    let scaledValue1 = mapRange(ascender, 0, upem, 0, width * GLYPH_SCALE)
    scaledValue1 = width - scaledValue1 + (yOffset * GLYPH_SCALE * width) / upem
    let scaledValue2 = mapRange(descender, 0, upem, 0, width * GLYPH_SCALE)
    scaledValue2 = width - scaledValue2 + (yOffset * GLYPH_SCALE * width) / upem

    ctx.strokeStyle = getCssVar("--text")
    ctx.beginPath()
    ctx.moveTo(value, scaledValue1)
    ctx.lineTo(value, scaledValue2)
    ctx.closePath()
    ctx.stroke()
}

function updateCanvas(selectedGlyphData, selectedFont, displayCharacter, displayName) {
    // initialize canvas
    let CANVAS_SCALE = window.devicePixelRatio
    const canvas = document.querySelector("#canvas")
    let canvasWidth = 60 * canvasScale
    let canvasHeight = 42 * canvasScale
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.width = canvasWidth * CANVAS_SCALE
    canvas.height = canvasHeight * CANVAS_SCALE
    const ctx = canvas.getContext("2d")
    ctx.scale(CANVAS_SCALE, CANVAS_SCALE)

    let GLYPH_SCALE = 0.6
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (selectedGlyphData.path) {
        const CANVAS_GLYPH_COMPOSITION_FILL = [
            {
                type: "outline",
                fill: true,
                color: getCssVar("--text"),
                pointSize: undefined,
            },
        ]
        const CANVAS_GLYPH_COMPOSITION_BEZIER = [
            // {
            // 	type: "outline",
            // 	fill: true,
            // 	color: "rgba(0, 0, 0, 0.1)",
            // 	pointSize: undefined,
            // },
            {
                type: "handles",
                fill: false,
                color: getCssVar("--middle"),
                pointSize: undefined,
            },
            {
                type: "outline",
                fill: false,
                color: getCssVar("--text"),
                pointSize: undefined,
            },
            {
                type: "points",
                fill: true,
                color: getCssVar("--text"),
                pointSize: 10, // size of point on bezier glyph
            },
            {
                type: "handle points",
                fill: true,
                color: getCssVar("--middle"),
                pointSize: 10, // size of handles on bezier glyph
            },
        ]

        const upem = selectedFont?.unitsPerEm || 1000
        const width = 60 * canvasScale

        const yOffset = -45 * canvasScale
        const xOffset = 20 * canvasScale
        const ascender = selectedFont?.tables.os2?.sTypoAscender || 750
        const capHeight = selectedFont?.tables.os2?.sCapHeight || 700
        const xHeight = selectedFont?.tables.os2?.sxHeight
        const baseline = 0
        const descender = selectedFont?.tables.os2?.sTypoDescender || -200
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Ascender", ascender, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Cap Height", capHeight, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "X-height", xHeight || 500, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Baseline", baseline, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Descender", descender, yOffset)
        drawFontLineVertical(GLYPH_SCALE, ctx, upem, width, 7 * canvasScale, yOffset, ascender, descender)
        drawFontLineVertical(GLYPH_SCALE, ctx, upem, width, 30 * canvasScale, yOffset, ascender, descender)
        drawFontLineVertical(GLYPH_SCALE, ctx, upem, width, 53 * canvasScale, yOffset, ascender, descender)

        ctx.fillStyle = getCssVar("--text")
        ctx.font = `${0.75 * canvasScale}px "CommitMono"`
        ctx.textAlign = "center"
        ctx.fillText(displayName, (30 - 11.5) * canvasScale, 2.75 * canvasScale)
        ctx.fillText(displayName, (30 + 11.5) * canvasScale, 2.75 * canvasScale)

        // make ready transformation matrixes for manipulating paths
        let firstMatrix = new DOMMatrix()
        firstMatrix = firstMatrix.scaleSelf(width / upem)
        let secondMatrix = new DOMMatrix()
        secondMatrix = secondMatrix.scaleSelf(GLYPH_SCALE)
        secondMatrix = secondMatrix.translateSelf(-width * 0.5, -width) // translate to left edge, top
        secondMatrix = secondMatrix.translateSelf((width * 0.5) / GLYPH_SCALE, width / GLYPH_SCALE) // translate to center, baseline
        secondMatrix = secondMatrix.translateSelf(0, (yOffset * width) / upem) // translate yOffset
        secondMatrix = secondMatrix.translateSelf((xOffset * width) / upem, 0) // translate xOffset

        // set initial value for glyph composition based on if bezier is switched on or off
        // let canvasGlyphComposition = bezier ? CANVAS_GLYPH_COMPOSITION_BEZIER : CANVAS_GLYPH_COMPOSITION_FILL

        CANVAS_GLYPH_COMPOSITION_BEZIER.forEach((composite) => {
            const calcPointsize = composite.pointSize * (upem / 1000)
            const firstPath2d = glyphBezier(selectedGlyphData, upem, composite.type, calcPointsize)
            const secondPath2d = new Path2D()
            secondPath2d.addPath(firstPath2d, firstMatrix)
            const finalPath2d = new Path2D()
            finalPath2d.addPath(secondPath2d, secondMatrix)

            if (composite.fill) {
                ctx.fillStyle = composite.color
                ctx.fill(finalPath2d)
            } else {
                ctx.strokeStyle = composite.color
                ctx.stroke(finalPath2d)
            }
        })
        CANVAS_GLYPH_COMPOSITION_FILL.forEach((composite) => {
            secondMatrix = secondMatrix.translateSelf((-2 * xOffset * width) / upem, 0) // translate xOffset

            const calcPointsize = composite.pointSize * (upem / 1000)
            const firstPath2d = glyphBezier(selectedGlyphData, upem, composite.type, calcPointsize)
            const secondPath2d = new Path2D()
            secondPath2d.addPath(firstPath2d, firstMatrix)
            const finalPath2d = new Path2D()
            finalPath2d.addPath(secondPath2d, secondMatrix)

            if (composite.fill) {
                ctx.fillStyle = composite.color
                ctx.fill(finalPath2d)
            } else {
                ctx.strokeStyle = composite.color
                ctx.stroke(finalPath2d)
            }
        })
    }
}

function glyphBezier(glyph, upem, typeOfOutline, pointSize) {
    let ps = pointSize
    let offsetX = (upem - glyph.advanceWidth) * 0.5
    let path2d = new Path2D()

    if (typeOfOutline == "outline") {
        let commandString = ""
        glyph.path.commands.forEach((command) => {
            switch (command.type) {
                case "M":
                    commandString += `${command.type} `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "L":
                    commandString += `${command.type} `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "C":
                    commandString += `${command.type} `
                    commandString += `${command.x1 + offsetX} ${upem - command.y1}, `
                    commandString += `${command.x2 + offsetX} ${upem - command.y2}, `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "Q":
                    commandString += `${command.type} `
                    commandString += `${command.x1 + offsetX} ${upem - command.y1}, `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "Z":
                    commandString += `${command.type} `
                    break
            }
        })
        path2d.addPath(new Path2D(commandString))
    }

    if (typeOfOutline == "points") {
        glyph.path.commands.forEach((command) => {
            let p = new Path2D()
            const x = command.x + offsetX
            const y = upem - command.y
            switch (command.type) {
                case "M":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
                case "L":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
                case "C":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
                case "Q":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
            }
            path2d.addPath(p)
        })
    }

    if (typeOfOutline == "handles") {
        let p = new Path2D()
        glyph.path.commands.forEach((command) => {
            switch (command.type) {
                case "M":
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
                case "L":
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
                case "C":
                    p.lineTo(command.x1 + offsetX, upem - command.y1)
                    p.moveTo(command.x + offsetX, upem - command.y)
                    p.lineTo(command.x2 + offsetX, upem - command.y2)
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
                case "Q":
                    p.lineTo(command.x1 + offsetX, upem - command.y1)
                    p.moveTo(command.x1 + offsetX, upem - command.y1)
                    p.lineTo(command.x + offsetX, upem - command.y)
                    break
                case "Z":
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
            }
        })
        path2d.addPath(p)
    }

    if (typeOfOutline == "handle points") {
        glyph.path.commands.forEach((command) => {
            let p = new Path2D()
            const x1 = command.x1 + offsetX
            const x2 = command.x2 + offsetX
            const y1 = upem - command.y1
            const y2 = upem - command.y2
            switch (command.type) {
                case "C":
                    p.rect(x1 - ps * 0.5, y1 - ps * 0.5, ps, ps)
                    p.rect(x2 - ps * 0.5, y2 - ps * 0.5, ps, ps)
                    break
                case "Q":
                    p.rect(x1 - ps * 0.5, y1 - ps * 0.5, ps, ps)
                    break
            }
            path2d.addPath(p)
        })
    }

    return path2d
}
