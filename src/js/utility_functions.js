// takes a string and returns a string, where the first letter is uppercase
function capitalize(string) {
	const stringArray = string.split("")
	return stringArray.shift().toUpperCase() + stringArray.join("")
}

const mapRange = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
