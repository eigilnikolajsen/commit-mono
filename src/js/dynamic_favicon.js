document.onvisibilitychange = () => {
	dynamicFavicon()
}

let faviconIntervalID
let faviconCounter = 0

function dynamicFavicon() {
	console.log(document.visibilityState)
	if (document.visibilityState === "visible") {
		faviconIntervalID = setInterval(changeFav, 500)
	} else {
		clearInterval(faviconIntervalID)
		faviconIntervalID = null
		if (faviconCounter % 2 == 1) changeFav()
	}

	function changeFav() {
		const link = document.createElement("link"),
			oldLink = document.getElementById("dynamic-favicon")

		link.id = "dynamic-favicon"
		link.rel = "icon"
		link.href = faviconCounter % 2 == 0 ? "src/favicon/icon-off.svg" : "src/favicon/icon.svg"
		if (oldLink) {
			document.head.removeChild(oldLink)
		}
		document.head.appendChild(link)
		faviconCounter++
	}
}

dynamicFavicon()
