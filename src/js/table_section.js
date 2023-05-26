function createTable() {
	const table = document.querySelector("#section_2 .content_container table")

	for (let i = 0; i <= 6; i++) {
		const tr = document.createElement("tr")
		const fieldset = document.createElement("fieldset")
		tr.append(fieldset)
		for (let j = 0; j <= 16; j++) {
			if (i == 0 || j == 0) {
				const th = document.createElement("th")
				if (i != 0 && j == 0) {
					th.textContent = createBinaryString(i + 1, 3)
				} else if (i == 0 && j != 0) {
					th.textContent = createBinaryString(j - 1, 4)
				} else {
					th.textContent = ""
				}
				fieldset.append(th)
			} else {
				const charCode = (i - 1) * 16 + j + 31

				const td = document.createElement("td")
				td.id = `td_${charCode}`
				const div = document.createElement("div")
				const input = document.createElement("input")
				input.type = "radio"
				input.id = `char_${charCode}`
				input.name = `row_${i}`
				input.value = charCode
				if (j == 1) input.setAttribute("checked", "true")
				const label = document.createElement("label")
				label.textContent = i == 6 && j == 16 ? "" : String.fromCharCode(charCode)
				label.setAttribute("for", `char_${charCode}`)
				div.append(input, label)
				td.append(div)
				fieldset.append(td)
			}
		}
		table.append(tr)
	}
}
const createBinaryString = (number, length) => parseInt(number, 10).toString(2).padStart(length, "0")
createTable()

let previousOutput = [32, 48, 64, 80, 96, 112]
function updateTable(event, form) {
	const data = new FormData(form)
	let output = []
	for (const entry of data) {
		// output = `${output}${entry[0]}=${entry[1]}\n`
		output.push(+entry[1])
	}
	const rowIndex = output.indexOf(+document.activeElement.value)
	let offset
	output.forEach((row, index) => {
		if (index == rowIndex) {
			offset = row - previousOutput[index]
		}
	})
	output.forEach((row, index) => {
		if (index != rowIndex) {
			console.log(rowIndex, previousOutput, output, offset, `char_${row + offset}`)
			const newCharID = offset >= 0 ? (offset <= 0 ? 0 : 1) : -1
			console.log(newCharID)
			document.forms["table_form"][`char_${row + newCharID}`].checked = true
		}
	})
	previousOutput = [...output]
	event.preventDefault()
}

// console.log(3 >= 0 ? (3 <= 0 ? 0 : 1) : -1)
