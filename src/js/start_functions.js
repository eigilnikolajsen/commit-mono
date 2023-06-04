function startAll() {
   console.log("startAll")

   appendStyleSheets()

   fillSectionData()

   buildNav()

   buildTable()

   buildFamiliar()

   buildCode()

   buildDistinction()

   buildGTC()

   buildExample()

   buildDocumentation()

   updateCodeFont()

   updateWaterfall()

   changeFavicon(true)

   updateNav(null, navForm)

   setInterval(checkDocumentFocus, 100)
   // setTimeout(() => {
   document.querySelector("#navigate_description").focus()
   document.querySelector("#loading").style.display = "none"
   // }, 1)
}

if (fontsLoaded) {
   console.log("fontsLoaded startAll()")
   startAll()
}
