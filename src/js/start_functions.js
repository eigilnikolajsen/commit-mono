let waitingForLoadIntervalID = null
let allCssLoaded = false
function startAll() {
    consol.log("startAll")

    appendStyleSheets()

    waitingForLoadIntervalID = setInterval(() => {
        if (allCssLoaded) {
            document.querySelector("#navigate_description").focus()
            document.querySelector("#loading").style.display = "none"
            clearInterval(waitingForLoadIntervalID)
            waitingForLoadIntervalID = null
        }
    }, 100)

    fillSectionData()

    buildNav()

    buildTable()

    buildFamiliar()

    buildCode()

    buildDistinction()

    buildGTC()

    buildExample()

    buildDocs()

    updateCodeFont()

    updateWaterfall()

    changeFavicon(true)

    sectionNavigation(0)

    setInterval(checkDocumentFocus, 100)
}

if (fontsLoaded) {
    consol.log("fontsLoaded startAll()")
    startAll()
}
