console.log("opentype test")
const versionOfCommitMono = "V109"

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

// async function initFont() {
// 	// opentype
// 	// 	.load("/src/fonts/instances/CommitMonoV109-VF.ttf")
// 	// 	.then(async (vf) => {
// 	// 		console.log(vf)
// 	// 		vf.download()
// 	// 	})
// 	// 	.catch((err) => console.log(err))

// 	commitMonoFont = await opentype.load(`/src/fonts/instances/CommitMono${versionOfCommitMono}-450.otf`)

// 	updateCode(null, codeForm)

// 	console.log(commitMonoFont)
// }

async function updateCodeFont() {
	opentype
		.load(`/src/fonts/instances/CommitMono${versionOfCommitMono}-${websiteData.weight}.otf`)
		.then((font) => {
			commitMonoFont = font
			updateCode(null, codeForm)
		})
		.catch((err) => console.log(err))
}

updateCodeFont()

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

async function downloadWithSettings(settings, button) {
	console.log(settings)
	button.classList.add("loading")

	const fontFilePath = `/src/fonts/instances/CommitMono${versionOfCommitMono}-${settings.weight}.otf`

	opentype
		.load(fontFilePath)
		.then(async (font) => {
			//
			// #1 change alternates by switching their paths
			// the below loop does this

			// loop through the alternate settings
			Object.entries(settings.alternates).forEach(([alternate, active]) => {
				//
				// filter for only the active ones
				if (!active) return
				console.log("alternate", alternate, "active", active)

				// look at all the fonts features
				font.tables.gsub.features.forEach((feature) => {
					//
					// if the feature matches the alternate we're currently on
					if (feature.tag == alternate) {
						console.log("feature", feature)

						// then loop through the list of lookup indexes of that feature
						feature.feature.lookupListIndexes.forEach((lookupIndex) => {
							console.log("lookupIndex", lookupIndex)

							// loop through the subtable of each lookup at the lookup index
							font.tables.gsub.lookups[lookupIndex].subtables.forEach((subtable) => {
								console.log("subtable", subtable)

								// loop through the glyphs of the subtable
								subtable.coverage.glyphs.forEach((glyphIndexOriginal, index) => {
									//
									// glyphIndexOriginal is the index of the original glyph
									// glyphIndexSubstitute is the index of the glyph to substitute the original with
									const glyphIndexSubstitute = subtable.substitute[index]
									console.log("glyphIndexOriginal", glyphIndexOriginal, "glyphIndexSubstitute", glyphIndexSubstitute)

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

			//
			// "2 put active features into calt
			// create empty "calt" feature to store the feature
			const emptyCalt = { tag: "calt", feature: { featureParams: 0, lookupListIndexes: [] } }
			font.tables.gsub.features.push(emptyCalt)

			// garbage code that adds a single number to a specific array in the gsub table
			// like this [0, 1, 2, 3, 4] => [0, 1, 2, 3, 4, 5]
			font.tables.gsub.scripts.forEach((script) =>
				script.script.defaultLangSys.featureIndexes.push(script.script.defaultLangSys.featureIndexes.length)
			)

			// create the empty array that is to be the lookup indexes for the calt feature
			const caltLookupIndexes = []

			// once again, loop through the alternate settings (feature settings)
			Object.entries(settings.features).forEach(([alternate, active]) => {
				//
				// filter for only the active ones
				if (!active) return
				console.log("alternate", alternate, "active", active)

				// then loop through all features
				font.tables.gsub.features.forEach((feature) => {
					//
					// and find the ones that match the active tags
					if (feature.tag == alternate) {
						console.log("feature", feature)

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
						console.log("caltLookupIndexes", caltLookupIndexes)
					}
				})
			})

			//
			// #3 change the names
			Object.entries(font.names).forEach(([nameKey, nameValue]) => {
				const oldName = `CommitMono${versionOfCommitMono}`
				const newName = "CommitMonoTEST1"
				if (nameValue.en.includes(oldName)) {
					nameValue.en = nameValue.en
						.split(oldName)
						.map((str, i) => (i == 0 ? newName : str))
						.join("")
				}
				console.log(nameKey)
				if (nameKey == "fullName") {
					font.names[nameKey].en = nameValue.en.split(" ").join("-")
				}
			})
			font.tables.name = font.names

			// await wait(1000)
			await font.download()
			downloadStarted = false
			button.classList.remove("loading")
			button.classList.add("loaded")

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
