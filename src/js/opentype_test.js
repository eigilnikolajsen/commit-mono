const updateOptions = (event, form) => {
   console.log("updateOptions")
   const data = new FormData(form)
   let output = ""
   for (const entry of data) {
      output = `${output}${entry[0]}=${entry[1]}\n`
   }
   event.preventDefault()
}

let commitMonoFont

async function updateCodeFont() {
   console.log("updateCodeFont")
   opentype
      .load(
         `/src/fonts/CommitMono${versionOfCommitMono}-${websiteData.weight}${
            websiteData.italic ? "Italic" : "Regular"
         }.otf`
      )
      .then((font) => {
         console.log(font)
         commitMonoFont = font
         updateCode(null, codeForm)
      })
      .catch((err) => console.log(err))
}

let downloadStarted = false
async function downloadFont(button) {
   console.log("downloadFont")
   if (!downloadStarted) {
      downloadStarted = true

      const regularDownloadSettigns = { ...fontDownloadSettings }
      const italicDownloadSettigns = { ...fontDownloadSettings }
      italicDownloadSettigns.italic = true
      const boldDownloadSettigns = { ...fontDownloadSettings }
      boldDownloadSettigns.weight = 700
      const bolditalicDownloadSettigns = { ...fontDownloadSettings }
      bolditalicDownloadSettigns.weight = 700
      bolditalicDownloadSettigns.italic = true

      getFontBlob(regularDownloadSettigns, "Regular", button)
         .then((resolve) => {
            fontFileBlobs.regular = resolve
            return getFontBlob(italicDownloadSettigns, "Italic", button)
         })
         .then((resolve) => {
            fontFileBlobs.italic = resolve
            return getFontBlob(boldDownloadSettigns, "Bold", button)
         })
         .then((resolve) => {
            fontFileBlobs.bold = resolve
            return getFontBlob(bolditalicDownloadSettigns, "Bold Italic", button)
         })
         .then((resolve) => {
            fontFileBlobs.bolditalic = resolve
            return getZipFileBlob()
         })
         .then((resolve) => {
            downloadStarted = false
            button.classList.remove("loading")
            button.classList.add("loaded")
            downloadFile(resolve)
         })
         .catch((err) => {
            downloadStarted = false
            button.classList.remove("loading")
            button.classList.add("error")
            console.log(err)
         })
   }
}

const fontFileBlobs = {
   regular: null,
   italic: null,
   bold: null,
   bolditalic: null,
}
function getFontBlob(settings, style, button) {
   console.log("getFontBlob")
   button.classList.add("loading")

   const fontFilePath = `/src/fonts/CommitMono${versionOfCommitMono}-${settings.weight}${
      settings.italic ? "Italic" : "Regular"
   }.otf`

   return opentype
      .load(fontFilePath)
      .then((font) => {
         //
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

         //
         // #3 change the names
         Object.entries(font.names).forEach(([nameKey, nameValue]) => {
            const oldName = `CommitMono${versionOfCommitMono}`
            const newName = "CommitMono"
            if (nameValue.en.includes(oldName)) {
               nameValue.en = nameValue.en
                  .split(oldName)
                  .map((str, i) => (i == 0 ? newName : str))
                  .join("")
            }
            // console.log(nameKey)
            if (nameKey == "fullName") {
               font.names[nameKey].en = nameValue.en.split(" ").join("-")
            }
            if (nameKey == "fontFamily") {
               font.names[nameKey].en = "CommitMono"
            }
            if (nameKey == "fontSubfamily") {
               // const styleToSubFamily = { regular: "Regular", italic: "Italic", bold: "Bold", bolditalic: "BoldItalic" }
               font.names[nameKey].en = style
            }
         })
         font.tables.name = font.names

         console.log(font)
         const fontAB = font.toArrayBuffer()
         const fontBlob = new Blob([fontAB], { type: "font/otf" })

         console.log(fontBlob)

         return fontBlob
      })
      .catch((err) => {
         return err
      })
}

async function getZipFileBlob() {
   console.log(fontFileBlobs)
   const { BlobWriter, BlobReader, HttpReader, TextReader, ZipWriter } = zip
   const installationTextURL = "/src/txt/installation.txt"
   const zipWriter = new ZipWriter(new BlobWriter("application/zip"))
   const { regular, italic, bold, bolditalic } = fontFileBlobs
   await Promise.all([
      zipWriter.add("installation.txt", new HttpReader(installationTextURL)),
      zipWriter.add("CommitMono-Regular.otf", new BlobReader(regular)),
      zipWriter.add("CommitMono-Italic.otf", new BlobReader(italic)),
      zipWriter.add("CommitMono-Bold.otf", new BlobReader(bold)),
      zipWriter.add("CommitMono-BoldItalic.otf", new BlobReader(bolditalic)),
   ])
   return zipWriter.close()
}

function downloadFile(blob) {
   const a = document.createElement("a")
   a.download = `CommitMono-${Date.now()}.zip`
   a.href = URL.createObjectURL(blob)
   a.click()
}
