// takes a string and returns a string, where the first letter is uppercase
function capitalize(string) {
    const stringArray = string.split("")
    return stringArray.shift().toUpperCase() + stringArray.join("")
}

const mapRange = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

const getCssVar = (property) => getComputedStyle(document.documentElement).getPropertyValue(property)
const setCssVar = ([property, value]) => document.documentElement.style.setProperty(property, value)

const isMobileTest = () => {
    if (window.matchMedia("(pointer: coarse) and (max-width: 1000px").matches) {
        // console.log("(pointer: coarse) and (max-width: 1000px)")
        return true
    } else return false
}

const mobileMediaQuery = "(pointer: coarse) and (max-width: 1000px)"
const mqlMobile = window.matchMedia(mobileMediaQuery)
let isMobile = mqlMobile.matches
mqlMobile.addEventListener("change", (e) => {
    isMobile = e.matches
    changedFocus(true)
})

// const darkModeMediaQuery = "(prefers-color-scheme: dark)"
// const mqlDarkMode = window.matchMedia(darkModeMediaQuery)
// let isDarkMode = mqlDarkMode.matches
// mqlDarkMode.addEventListener("change", changeMode)
function changeMode(isDarkMode, isHighContrast) {
    // console.log("CHANGE THEME")
    websiteData.invert = isDarkMode
    websiteData.highContrast = isHighContrast
    if (isHighContrast) {
        if (websiteData.invert) {
            setCssVar(["--bg", "#000"])
            setCssVar(["--text", "#fff"])
        } else {
            setCssVar(["--bg", "#fff"])
            setCssVar(["--text", "#000"])
        }
    } else {
        if (websiteData.invert) {
            setCssVar(["--bg", "#111"])
            setCssVar(["--text", "#aaa"])
        } else {
            setCssVar(["--bg", "#aaa"])
            setCssVar(["--text", "#111"])
        }
    }
    updateCode(null, codeForm)
}

function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds)
    })
}

let checkCssLoadIntervalIDs = []
function appendStyleSheets() {
    // console.log("appendStyleSheets")
    const stylesheetIndexes = [
        "style",
        "mobile",
        "non_essential",
        "section_1",
        "section_2",
        "section_3",
        "section_4",
        "section_5",
        "section_6",
        "section_7",
        "section_8",
        "section_9",
        "section_10",
    ]
    const head = document.querySelector("head")
    stylesheetIndexes.forEach((stylesheet, index) => {
        const link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", `src/css/${stylesheet}.css`)
        head.append(link)
        checkCssLoadIntervalIDs[index] = setInterval(() => {
            const cssLoaded = Boolean(link.sheet)
            if (cssLoaded) {
                // console.log(`${stylesheet} CSS loaded`)
                clearInterval(checkCssLoadIntervalIDs[index])
                checkCssLoadIntervalIDs[index] = null
                if (index == 3) {
                    allCssLoaded = true
                    // console.log("ALL CSS LOADED")
                }
            }
        }, 100)
    })
}

function showHideChangeSettings(text, ms, dim) {
    const changeSetting = document.querySelector("#change_setting p")
    changeSetting.textContent = text
    changeSetting.style.visibility = "visible"
    if (dim) {
        document.querySelector("#nav_form").classList.add("faded")
        document.querySelector("#main_scale").classList.add("faded")
    }
    clearTimeout(changeSettingTimeoutID)
    changeSettingTimeoutID = setTimeout(() => {
        changeSetting.style.visibility = "hidden"
        if (dim) {
            document.querySelector("#nav_form").classList.remove("faded")
            document.querySelector("#main_scale").classList.remove("faded")
        }
    }, ms ?? 1000)
}

const consol = {
    log: function (message) {
        // console.log(message)
    },
}
