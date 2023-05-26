console.log("opentype test")

const updateLabel = (input) => {
	console.log(input)
	input.parentNode.querySelector("output").textContent = input.value
}

const updateOptions = (event, form) => {
	console.log(event)

	const data = new FormData(form)
	let output = ""
	for (const entry of data) {
		output = `${output}${entry[0]}=${entry[1]}\n`
	}
	console.log(output)
	event.preventDefault()
}

let commitMonoFont

async function initFont() {
	commitMonoFont = await opentype.load("/fonts/CommitMonoV100-450.otf")

	updateCode(null, codeForm)

	console.log(commitMonoFont)
	// console.log(font.glyphs.glyphs[50].path)
	// console.log(font.glyphs.glyphs[76].path)

	// const newFont = switchGlyphs(font, 50, 76)

	// console.log(newFont)
	// console.log(newFont.glyphs.glyphs[50].path)
	// console.log(newFont.glyphs.glyphs[76].path)

	// const noSups = deleteFeature(font, "c001")

	// console.log(noSups)
	// font.download()
}

function deleteFeature(font, delFea) {
	const featureIndex = font.tables.gsub.features.find((fea) => fea.tag == delFea)?.feature?.lookupListIndexes[0]
	font.tables.gsub.lookups[featureIndex].subtables = [
		{
			coverage: {
				format: 1,
				glyphs: [],
			},
			subsFormat: 2,
			substitute: [],
		},
	]
	const features = font.tables.gsub.features.map((fea) => {
		if (fea.tag == delFea) return fea
	})
	features.forEach((feature, index) => {
		feature ? (font.tables.gsub.features[index] = feature) : null
	})
	return font
}

function switchGlyphs(font, glyphIndexA, glyphIndexB) {
	const glyphPathA = font.glyphs.glyphs[glyphIndexA].path
	const glyphPathB = font.glyphs.glyphs[glyphIndexB].path
	font.glyphs.glyphs[glyphIndexB].path = glyphPathA
	font.glyphs.glyphs[glyphIndexA].path = glyphPathB
	return font
}

initFont()
