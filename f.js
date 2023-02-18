// @dflt = [exclam comma period slash colon semicolon question backslash bar];
// @c2_1 = [exclam.c2_1 comma.c2_1 period.c2_1 slash.c2_1 colon.c2_1 semicolon.c2_1 question.c2_1 backslash.c2_1 bar.c2_1];
// @c2_2 = [exclam.c2_2 comma.c2_2 period.c2_2 slash.c2_2 colon.c2_2 semicolon.c2_2 question.c2_2 backslash.c2_2 bar.c2_2];
// @c3_1 = [exclam.c3_1 comma.c3_1 period.c3_1 slash.c3_1 colon.c3_1 semicolon.c3_1 question.c3_1 backslash.c3_1 bar.c3_1];
// @c3_2 = [exclam comma period slash colon semicolon question backslash bar];
// @c3_3 = [exclam.c3_3 comma.c3_3 period.c3_3 slash.c3_3 colon.c3_3 semicolon.c3_3 question.c3_3 backslash.c3_3 bar.c3_3];

const input =
	"universal=universal., partialdiff=partialdiff., existential=existential., uni2204=uni2204., emptyset=emptyset., uni2206=uni2206., gradient=gradient., element=element., notelement=notelement., uni220A=uni220A., suchthat=suchthat., uni220C=uni220C., uni220D=uni220D., uni220E=uni220E., product=product., summation=summation., minus=minus., uni2215=uni2215., asteriskmath=asteriskmath., uni2219=uni2219., radical=radical., infinity=infinity., logicaland=logicaland., logicalor=logicalor., intersection=intersection., union=union., integral=integral., therefore=therefore., uni2235=uni2235., uni2236=uni2236., uni2237=uni2237., uni2241=uni2241., uni2242=uni2242., uni2243=uni2243., uni2244=uni2244., congruent=congruent., uni2246=uni2246., uni2247=uni2247., approxequal=approxequal., uni2249=uni2249., uni224A=uni224A., uni224B=uni224B., notequal=notequal., equivalence=equivalence., uni2262=uni2262., lessequal=lessequal., greaterequal=greaterequal., propersubset=propersubset., propersuperset=propersuperset., notsubset=notsubset., uni2285=uni2285., reflexsubset=reflexsubset., reflexsuperset=reflexsuperset., uni2288=uni2288., uni2289=uni2289., uni228A=uni228A., uni228B=uni228B., uni229C=uni229C., uni22A2=uni22A2., uni22A3=uni22A3., uni22A4=uni22A4., uni22A5=uni22A5., uni22A6=uni22A6., uni22A7=uni22A7., uni22A8=uni22A8., uni22A9=uni22A9., uni22AA=uni22AA., uni22AB=uni22AB., uni22AC=uni22AC., uni22AD=uni22AD., uni22AE=uni22AE., uni22AF=uni22AF., uni2300=uni2300., house=house., uni2303=uni2303., uni2304=uni2304., uni2305=uni2305., uni2306=uni2306., revlogicalnot=revlogicalnot., uni2318=uni2318., integraltp=integraltp., integralbt=integralbt., uni2324=uni2324., uni2325=uni2325., uni2326=uni2326., uni2327=uni2327., uni2328=uni2328., uni232B=uni232B., uni2387=uni2387., uni2388=uni2388., uni238B=uni238B., uni239B=uni239B., uni239C=uni239C., uni239D=uni239D., uni239E=uni239E., uni239F=uni239F., uni23A0=uni23A0., uni23A1=uni23A1., uni23A2=uni23A2., uni23A3=uni23A3., uni23A4=uni23A4., uni23A5=uni23A5., uni23A6=uni23A6., uni23A7=uni23A7., uni23A8=uni23A8., uni23A9=uni23A9., uni23AA=uni23AA., uni23AB=uni23AB., uni23AC=uni23AC., uni23AD=uni23AD., uni23CE=uni23CE., uni23CF=uni23CF."
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

// pbcopy(buildGlyphs(input))
console.log(buildGlyphs(input))
