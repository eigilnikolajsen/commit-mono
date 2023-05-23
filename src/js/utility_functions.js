// takes a string and returns a string, where the first letter is uppercase
function capitalize(string) {
	const stringArray = string.split("")
	return stringArray.shift().toUpperCase() + stringArray.join("")
}
