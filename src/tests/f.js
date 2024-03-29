// @dflt = [exclam comma period slash colon semicolon question backslash bar];
// @c2_1 = [exclam.c2_1 comma.c2_1 period.c2_1 slash.c2_1 colon.c2_1 semicolon.c2_1 question.c2_1 backslash.c2_1 bar.c2_1];
// @c2_2 = [exclam.c2_2 comma.c2_2 period.c2_2 slash.c2_2 colon.c2_2 semicolon.c2_2 question.c2_2 backslash.c2_2 bar.c2_2];
// @c3_1 = [exclam.c3_1 comma.c3_1 period.c3_1 slash.c3_1 colon.c3_1 semicolon.c3_1 question.c3_1 backslash.c3_1 bar.c3_1];
// @c3_2 = [exclam comma period slash colon semicolon question backslash bar];
// @c3_3 = [exclam.c3_3 comma.c3_3 period.c3_3 slash.c3_3 colon.c3_3 semicolon.c3_3 question.c3_3 backslash.c3_3 bar.c3_3];

const input =
    "exclam exclam.square comma period period.square slash slash.case colon colon.square colon.case colon.case.square semicolon semicolon.square semicolon.case semicolon.case.square question question.square backslash backslash.case bar bar.case less less.case greater greater.case asterisk asterisk.case plus plus.case hyphen hyphen.case equal equal.case asciitilde asciitilde.case"
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

pbcopy(c002(input))
console.log(c002(input))

// pbcopy(classExcess(classContent))
// console.log(classExcess(classContent))

// pbcopy(buildGlyphs(input))
// console.log(buildGlyphs(input))
