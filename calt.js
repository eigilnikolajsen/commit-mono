const fs = require("fs")
const readline = require("readline")

function pbcopy(data) {
	var proc = require("child_process").spawn("pbcopy")
	proc.stdin.write(data)
	proc.stdin.end()
}

async function featuresToCalt() {
	const features = ["c001", "c002", "c003", "c004", "c005", "c006", "c007"]

	let calt = []

	for await (const feature of features) {
		const fileStream = fs.createReadStream(`features/${feature}.fea`)

		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		})
		// Note: we use the crlfDelay option to recognize all instances of CR LF
		// ('\r\n') in input.txt as a single line break.

		const lines = []

		lines.push(`### feature ${feature} ###`)

		for await (const line of rl) {
			// Each line in input.txt will be successively available here as `line`.
			// console.log(`Line from file: ${line}`)
			lines.push(line)
		}

		calt.push(lines)
	}

	calt = calt.flat().filter((ln) => !ln.includes("feature") && !ln.includes("} c0"))
	calt = calt.map((ln) => {
		if (ln.includes("lookup")) return ln.split("lookup ").join("lookup _")
		if (ln.includes("} ")) return ln.split("} ").join("} _")
		return ln
	})

	// calt.forEach((ln) => console.log(ln))
	pbcopy(`
feature calt {
    # Contextual Alternates
    # Contains all 'cxxx' features

${calt.join("\n")}

} calt;`)
}

featuresToCalt()
