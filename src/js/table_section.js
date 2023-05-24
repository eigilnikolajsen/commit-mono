function createTable() {
	const table = document.querySelector("#section_2 .content_container table")

	for (let i = 0; i <= 6; i++) {
		const tr = document.createElement("tr")
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
				tr.append(th)
			} else {
				const td = document.createElement("td")
				const div = document.createElement("div")
				const p = document.createElement("p")
				p.textContent = i == 6 && j == 16 ? "" : String.fromCharCode((i - 1) * 16 + j + 31)
				div.append(p)
				td.append(div)
				tr.append(td)
			}
		}
		table.append(tr)
	}
}
const createBinaryString = (number, length) => parseInt(number, 10).toString(2).padStart(length, "0")
createTable()
