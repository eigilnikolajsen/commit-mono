// @dflt = [exclam comma period slash colon semicolon question backslash bar];
// @c2_1 = [exclam.c2_1 comma.c2_1 period.c2_1 slash.c2_1 colon.c2_1 semicolon.c2_1 question.c2_1 backslash.c2_1 bar.c2_1];
// @c2_2 = [exclam.c2_2 comma.c2_2 period.c2_2 slash.c2_2 colon.c2_2 semicolon.c2_2 question.c2_2 backslash.c2_2 bar.c2_2];
// @c3_1 = [exclam.c3_1 comma.c3_1 period.c3_1 slash.c3_1 colon.c3_1 semicolon.c3_1 question.c3_1 backslash.c3_1 bar.c3_1];
// @c3_2 = [exclam comma period slash colon semicolon question backslash bar];
// @c3_3 = [exclam.c3_3 comma.c3_3 period.c3_3 slash.c3_3 colon.c3_3 semicolon.c3_3 question.c3_3 backslash.c3_3 bar.c3_3];

const input =
	"exclam exclam.square comma period period.square slash slash.case colon colon.square colon.case colon.case.square semicolon semicolon.square semicolon.case semicolon.case.square question question.square backslash backslash.case bar bar.case"
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
pbcopy(c002(input))
console.log(c002(input))

const classContent =
	"exclam numbersign dollar percent ampersand asterisk plus zero one two three four five six seven eight nine question A B C D E F G H I J K L M N O P Q R S T U V W X Y Z sterling yen copyright registered Agrave Aacute Acircumflex Atilde Adieresis Aring AE Ccedilla Egrave Eacute Ecircumflex Edieresis Igrave Iacute Icircumflex Idieresis Eth Ntilde Ograve Oacute Ocircumflex Otilde Odieresis Oslash Ugrave Uacute Ucircumflex Udieresis Yacute Thorn Amacron Abreve Aogonek Cacute Ccircumflex Cdotaccent Ccaron Dcaron Dcroat Emacron Ebreve Edotaccent Eogonek Ecaron Gcircumflex Gbreve Gdotaccent Gcommaaccent Hcircumflex Hbar Itilde Imacron Iogonek Idotaccent IJ Jcircumflex Kcommaaccent Lacute Lcommaaccent Lcaron Ldot Lslash Nacute Ncommaaccent Ncaron Omacron Obreve Ohungarumlaut OE Racute Rcommaaccent Rcaron Sacute Scircumflex Scedilla Scaron Tcedilla Tcaron Tbar Utilde Umacron Ubreve Uring Uhungarumlaut Uogonek Wcircumflex Ycircumflex Ydieresis Zdotaccent Zcaron Scommaaccent Tcommaaccent Delta Omega Wgrave Wacute Wdieresis dagger daggerdbl perthousand franc lira peseta Euro product summation radical lozenge Ohm six.cv03 nine.cv03 approxequal.case asciitilde.case asterisk.case at.case backslash.case bar.case braceleft.case braceright.case bracketleft.case bracketright.case brokenbar.case bullet.case bulletoperator.case colon.case divide.case divisionslash.case emdash.case endash.case equal.case exclamdown.case greater.case greaterequal.case guillemotleft.case guillemotright.case guilsinglleft.case guilsinglright.case hyphen.case less.case lessequal.case logicalnot.case minus.case multiply.case notequal.case parenleft.case parenright.case periodcentered.case plus.case plusminus.case questiondown.case semicolon.case slash.case softhyphen.case Adieresis.square Cdotaccent.square Edieresis.square Edotaccent.square Gcommaaccent.square Gdotaccent.square Idieresis.square Idotaccent.square Kcommaaccent.square Lcommaaccent.square Ldot.square Ncommaaccent.square Odieresis.square Rcommaaccent.square Scommaaccent.square Tcommaaccent.square Udieresis.square Wdieresis.square Ydieresis.square Zdotaccent.square backslash.case.c2_1 backslash.case.c2_2 backslash.case.c3_1 backslash.case.c3_3 bar.case.c2_1 bar.case.c2_2 bar.case.c3_1 bar.case.c3_3 bullet.case.square bulletoperator.case.square colon.case.c2_1 colon.case.c2_2 colon.case.c3_1 colon.case.c3_3 colon.case.square colon.case.square.c2_1 colon.case.square.c2_2 colon.case.square.c3_1 colon.case.square.c3_3 equal.arrow.case exclamdown.case.square greater.arrow_end.case greater.arrow_start.case greater.arrow_start_equal.case greater.arrow_start_hyphen.case greater.pipe.case hyphen.arrow.case less.arrow_end.case less.arrow_start.case less.arrow_start_equal.case less.arrow_start_hyphen.case less.pipe.case periodcentered.case.square questiondown.case.square semicolon.case.c2_1 semicolon.case.c2_2 semicolon.case.c3_1 semicolon.case.c3_3 semicolon.case.square semicolon.case.square.c2_1 semicolon.case.square.c2_2 semicolon.case.square.c3_1 semicolon.case.square.c3_3 slash.case.c2_1 slash.case.c2_2 slash.case.c3_1 slash.case.c3_3 divide.case.square approxequal.case asciitilde.case asterisk.case at.case backslash.case backslash.case.c2_1 backslash.case.c2_2 backslash.case.c3_1 backslash.case.c3_3 bar.case bar.case.c2_1 bar.case.c2_2 bar.case.c3_1 bar.case.c3_3 braceleft.case braceright.case bracketleft.case bracketright.case brokenbar.case bullet.case bullet.case.square bulletoperator.case bulletoperator.case.square colon.case colon.case.c2_1 colon.case.c2_2 colon.case.c3_1 colon.case.c3_3 colon.case.square colon.case.square.c2_1 colon.case.square.c2_2 colon.case.square.c3_1 colon.case.square.c3_3 divide.case divide.case.square divisionslash.case emdash.case endash.case equal.arrow.case equal.case exclamdown.case exclamdown.case.square greater.arrow_end.case greater.arrow_start.case greater.arrow_start_equal.case greater.arrow_start_hyphen.case greater.case greater.pipe.case greaterequal.case guillemotleft.case guillemotright.case guilsinglleft.case guilsinglright.case hyphen.arrow.case hyphen.case less.arrow_end.case less.arrow_start.case less.arrow_start_equal.case less.arrow_start_hyphen.case less.case less.pipe.case lessequal.case logicalnot.case minus.case multiply.case notequal.case parenleft.case parenright.case periodcentered.case periodcentered.case.square plus.case plusminus.case questiondown.case questiondown.case.square semicolon.case semicolon.case.c2_1 semicolon.case.c2_2 semicolon.case.c3_1 semicolon.case.c3_3 semicolon.case.square semicolon.case.square.c2_1 semicolon.case.square.c2_2 semicolon.case.square.c3_1 semicolon.case.square.c3_3 slash.case slash.case.c2_1 slash.case.c2_2 slash.case.c3_1 slash.case.c3_3 softhyphen.case"
function classExcess(c) {
	return [...new Set(c.split(" "))].join(" ")
}
function pbcopy(data) {
	var proc = require("child_process").spawn("pbcopy")
	proc.stdin.write(data)
	proc.stdin.end()
}

// pbcopy(classExcess(classContent))
// console.log(classExcess(classContent))
