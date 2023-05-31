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
	commitMonoFont = await opentype.load("/src/fonts/instances/CommitMonoV108-450.otf")

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

let downloadStarted = false
async function downloadFont(button) {
	if (!downloadStarted) {
		downloadStarted = true
		let downloadableFont
		if (button.dataset.type === "staticDefault") {
			downloadWithSettings(fontDownloadSettingsDefault, button)
		}
		if (button.dataset.type === "staticCurrent") {
			downloadWithSettings(fontDownloadSettings, button)
			console.log(button.dataset.type)
		}
		if (button.dataset.type === "variableDefault") {
			downloadWithSettings(fontDownloadSettingsDefault, button)
			console.log(button.dataset.type)
		}
	}
}

function wait(milliseconds) {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds)
	})
}

async function downloadWithSettings(settings, button) {
	console.log(settings)
	button.classList.add("loading")

	opentype
		.load(`/src/fonts/instances/CommitMonoV108-${settings.weight}.otf`)
		.then(async (font) => {
			Object.entries(settings.alternates).forEach(([alternate, active]) => {
				if (!active) return
				font.tables.gsub.features.forEach((feature) => {
					if (feature.tag == alternate) {
						feature.feature.lookupListIndexes.forEach((lookupIndex) => {
							font.tables.gsub.lookups[lookupIndex].subtables.forEach((subtable) => {
								console.log(subtable.substitute)
							})
						})
						console.log(feature.feature.lookupListIndexes)
					}
				})
			})
			Object.entries(settings.features).forEach(([key, value]) => {
				console.log(key, value)
			})

			await wait(1000)
			button.classList.remove("loading")
			button.classList.add("loaded")

			downloadStarted = false
			console.log(font)
		})
		.catch(async (err) => {
			await wait(1000)
			button.classList.remove("loading")
			button.classList.add("error")

			downloadStarted = false
			console.log(err)
		})
}
