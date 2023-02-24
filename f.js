// @dflt = [exclam comma period slash colon semicolon question backslash bar];
// @c2_1 = [exclam.c2_1 comma.c2_1 period.c2_1 slash.c2_1 colon.c2_1 semicolon.c2_1 question.c2_1 backslash.c2_1 bar.c2_1];
// @c2_2 = [exclam.c2_2 comma.c2_2 period.c2_2 slash.c2_2 colon.c2_2 semicolon.c2_2 question.c2_2 backslash.c2_2 bar.c2_2];
// @c3_1 = [exclam.c3_1 comma.c3_1 period.c3_1 slash.c3_1 colon.c3_1 semicolon.c3_1 question.c3_1 backslash.c3_1 bar.c3_1];
// @c3_2 = [exclam comma period slash colon semicolon question backslash bar];
// @c3_3 = [exclam.c3_3 comma.c3_3 period.c3_3 slash.c3_3 colon.c3_3 semicolon.c3_3 question.c3_3 backslash.c3_3 bar.c3_3];

const input =
	"uni2500=uni2500., uni2501=uni2501., uni2502=uni2502., uni2503=uni2503., uni2504=uni2504., uni2505=uni2505., uni2506=uni2506., uni2507=uni2507., uni2508=uni2508., uni2509=uni2509., uni250A=uni250A., uni250B=uni250B., uni250C=uni250C., uni250D=uni250D., uni250E=uni250E., uni250F=uni250F., uni2510=uni2510., uni2511=uni2511., uni2512=uni2512., uni2513=uni2513., uni2514=uni2514., uni2515=uni2515., uni2516=uni2516., uni2517=uni2517., uni2518=uni2518., uni2519=uni2519., uni251A=uni251A., uni251B=uni251B., uni251C=uni251C., uni251D=uni251D., uni251E=uni251E., uni251F=uni251F., uni2520=uni2520., uni2521=uni2521., uni2522=uni2522., uni2523=uni2523., uni2524=uni2524., uni2525=uni2525., uni2526=uni2526., uni2527=uni2527., uni2528=uni2528., uni2529=uni2529., uni252A=uni252A., uni252B=uni252B., uni252C=uni252C., uni252D=uni252D., uni252E=uni252E., uni252F=uni252F., uni2530=uni2530., uni2531=uni2531., uni2532=uni2532., uni2533=uni2533., uni2534=uni2534., uni2535=uni2535., uni2536=uni2536., uni2537=uni2537., uni2538=uni2538., uni2539=uni2539., uni253A=uni253A., uni253B=uni253B., uni253C=uni253C., uni253D=uni253D., uni253E=uni253E., uni253F=uni253F., uni2540=uni2540., uni2541=uni2541., uni2542=uni2542., uni2543=uni2543., uni2544=uni2544., uni2545=uni2545., uni2546=uni2546., uni2547=uni2547., uni2548=uni2548., uni2549=uni2549., uni254A=uni254A., uni254B=uni254B., uni254C=uni254C., uni254D=uni254D., uni254E=uni254E., uni254F=uni254F., uni2550=uni2550., uni2551=uni2551., uni2552=uni2552., uni2553=uni2553., uni2554=uni2554., uni2555=uni2555., uni2556=uni2556., uni2557=uni2557., uni2558=uni2558., uni2559=uni2559., uni255A=uni255A., uni255B=uni255B., uni255C=uni255C., uni255D=uni255D., uni255E=uni255E., uni255F=uni255F., uni2560=uni2560., uni2561=uni2561., uni2562=uni2562., uni2563=uni2563., uni2564=uni2564., uni2565=uni2565., uni2566=uni2566., uni2567=uni2567., uni2568=uni2568., uni2569=uni2569., uni256A=uni256A., uni256B=uni256B., uni256C=uni256C., uni256D=uni256D., uni256E=uni256E., uni256F=uni256F., uni2570=uni2570., uni2571=uni2571., uni2572=uni2572., uni2573=uni2573., uni2574=uni2574., uni2575=uni2575., uni2576=uni2576., uni2577=uni2577., uni2578=uni2578., uni2579=uni2579., uni257A=uni257A., uni257B=uni257B., uni257C=uni257C., uni257D=uni257D., uni257E=uni257E., uni257F=uni257F., upBlock=upBlock., uni2581=uni2581., uni2582=uni2582., uni2583=uni2583., downBlock=downBlock., uni2585=uni2585., uni2586=uni2586., uni2587=uni2587., block=block., uni2589=uni2589., uni258A=uni258A., uni258B=uni258B., lfblock=lfblock., uni258D=uni258D., uni258E=uni258E., uni258F=uni258F., rtblock=rtblock., ltshade=ltshade., shade=shade., dkshade=dkshade., uni2594=uni2594., uni2595=uni2595., quadrantLowerLeft=quadrantLowerLeft., quadrantLowerRight=quadrantLowerRight., quadrantUpperLeft=quadrantUpperLeft., quadrantUpperLeftAndLowerLeftAndLowerRight=quadrantUpperLeftAndLowerLeftAndLowerRight., quadrantUpperLeftAndLowerRight=quadrantUpperLeftAndLowerRight., quadrantUpperLeftAndUpperRightAndLowerLeft=quadrantUpperLeftAndUpperRightAndLowerLeft., quadrantUpperLeftAndUpperRightAndLowerRight=quadrantUpperLeftAndUpperRightAndLowerRight., quadrantUpperRight=quadrantUpperRight., quadrantUpperRightAndLowerLeft=quadrantUpperRightAndLowerLeft., quadrantUpperRightAndLowerLeftAndLowerRight=quadrantUpperRightAndLowerLeftAndLowerRight., filledbox=filledbox., uni25A1=uni25A1., whiteSquareWithRoundedCorners=whiteSquareWithRoundedCorners., uni25A3=uni25A3., uni25A4=uni25A4., uni25A5=uni25A5., uni25A6=uni25A6., uni25A7=uni25A7., uni25A8=uni25A8., uni25A9=uni25A9., uni25AA=uni25AA., uni25AB=uni25AB., filledrect=filledrect., uni25AD=uni25AD., uni25AE=uni25AE., uni25AF=uni25AF., triagupTriangle=triagupTriangle., uni25B6=uni25B6., triangleright=triangleright., triangledown=triangledown., uni25C0=uni25C0., triaglf=triaglf., uni25C6=uni25C6., uni25C7=uni25C7., uni25C9=uni25C9., lozenge=lozenge., circle=circle., uni25CE=uni25CE., uni25CF=uni25CF., uni25D0=uni25D0., uni25D1=uni25D1., uni25D2=uni25D2., uni25D3=uni25D3., uni25D5=uni25D5., uni25D6=uni25D6., uni25D7=uni25D7., invcircle=invcircle., uni25DA=uni25DA., uni25DB=uni25DB., uni25DC=uni25DC., uni25DD=uni25DD., uni25DE=uni25DE., uni25DF=uni25DF., uni25E0=uni25E0., uni25E1=uni25E1., blackLowerRightTriangle=blackLowerRightTriangle., blackLowerLeftTriangle=blackLowerLeftTriangle., blackUpperLeftTriangle=blackUpperLeftTriangle., blackUpperRightTriangle=blackUpperRightTriangle., uni25E7=uni25E7., uni25E8=uni25E8., uni25E9=uni25E9., uni25EA=uni25EA., uni25EB=uni25EB., uni25EF=uni25EF., whiteSquareWithUpperLeftQuadrant=whiteSquareWithUpperLeftQuadrant., whiteSquareWithLowerLeftQuadrant=whiteSquareWithLowerLeftQuadrant., whiteSquareWithLowerRightQuadrant=whiteSquareWithLowerRightQuadrant., whiteSquareWithUpperRightQuadrant=whiteSquareWithUpperRightQuadrant., uni25F4=uni25F4., uni25F5=uni25F5., uni25F6=uni25F6., uni25F7=uni25F7., uni2610=uni2610., uni2611=uni2611., uni2612=uni2612., uni2620=uni2620., uni2630=uni2630., uni2631=uni2631., uni2632=uni2632., uni2633=uni2633., uni2634=uni2634., uni2635=uni2635., uni2636=uni2636., uni2637=uni2637."
function c002(input) {
	const s = input.split(" ")
	return `
    @dflt = [${input}];
    @c2_1 = [${s.join(".c2_1 ")}.c2_1];
    @c2_2 = [${s.join(".c2_2 ")}.c2_2];
    @c3_1 = [${s.join(".c3_1 ")}.c3_1];
    @c3_3 = [${s.join(".c3_3 ")}.c3_3];
    `
}

function classExcess(c) {
	return [...new Set(c.split(" "))].join(" ")
}

function buildGlyphs(g) {
	return g
		.split(", ")
		.map((gl) => gl.split("=")[0])
		.join(", ")
}

function pbcopy(data) {
	var proc = require("child_process").spawn("pbcopy")
	proc.stdin.write(data)
	proc.stdin.end()
}

// pbcopy(c002(input))
// console.log(c002(input))

// pbcopy(classExcess(classContent))
// console.log(classExcess(classContent))

pbcopy(buildGlyphs(input))
console.log(buildGlyphs(input))

const fs = require("fs")
const readline = require("readline")

async function featuresToCalt() {
	const features = ["c001", "c002", "c003", "c004", "c005", "c006"]

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

#> feature

${calt.join("\n")}

#< feature

} calt;`)
}

// featuresToCalt()
