console.log("opentype test")

async function initFont() {
	const font = await opentype.load("/fonts/CommitMonoOTV1-450.otf")

	console.log(font)
	console.log(font.glyphs.glyphs[50].path)
	console.log(font.glyphs.glyphs[76].path)

	const newFont = switchGlyphs(font, 50, 76)

	console.log(newFont)
	console.log(newFont.glyphs.glyphs[50].path)
	console.log(newFont.glyphs.glyphs[76].path)

	// newFont.download()
}

function switchGlyphs(font, glyphIndexA, glyphIndexB) {
	const glyphPathA = font.glyphs.glyphs[glyphIndexA].path
	const glyphPathB = font.glyphs.glyphs[glyphIndexB].path
	font.glyphs.glyphs[glyphIndexB].path = glyphPathA
	font.glyphs.glyphs[glyphIndexA].path = glyphPathB
	return font
}

initFont()
