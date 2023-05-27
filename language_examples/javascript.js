/**
 * Main Code for Longest Commmon Subsequence
 *
 * @param {Integer[]} arr1
 * @param {Integer[]} arr2
 */

function lcs(arr1, arr2) {
	let matrix = [...Array(arr1.length + 1)].fill(0).map(() => Array(arr2.length + 1).fill(0))

	for (let rowIndex = 1; rowIndex <= arr1.length; rowIndex++) {
		for (let columnIndex = 1; columnIndex <= arr2.length; columnIndex++) {
			if (arr1[rowIndex - 1] === arr2[columnIndex - 1]) {
				matrix[rowIndex][columnIndex] = 1 + matrix[rowIndex - 1][columnIndex - 1]
			} else {
				matrix[rowIndex][columnIndex] = Math.max(matrix[rowIndex - 1][columnIndex], matrix[rowIndex][columnIndex - 1])
			}
		}
	}
	//If there is no match, printing empty string
	if (matrix[arr1.length][arr2.index] === 0) {
		console.log("")
		return
	}

	let result = []
	let rowIndex = arr1.length
	let columnIndex = arr2.length

	while (rowIndex > 0 && columnIndex > 0) {
		if (arr1[rowIndex - 1] === arr2[columnIndex - 1]) {
			//Prepending everytime a new character is matched in both strings
			result.unshift(arr1[rowIndex - 1])
			rowIndex--
			columnIndex--
		} else if (matrix[rowIndex - 1][columnIndex] === matrix[rowIndex][columnIndex]) {
			rowIndex--
		} else {
			columnIndex--
		}
	}
	//Converting the LCS array into a comma separated string
	console.log(result.join(", "))
}

//Usage Text
const usage = 'Usage: please provide two lists in the format "1, 2, 3, 4, 5"'
if (process.argv.length < 4 || process.argv[2] == "" || process.argv[3] == "") {
	console.log(usage)
	return
} else {
	const input1 = process.argv[2]
	const input2 = process.argv[3]
	//Parsing into integers after trimming extra blank spaces
	const array1 = input1.split(",").map((x) => parseInt(x.trim(), 10))
	const array2 = input2.split(",").map((y) => parseInt(y.trim(), 10))
	lcs(array1, array2)
}
