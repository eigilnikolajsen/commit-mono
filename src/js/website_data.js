const websiteData = {
	pushPage: {
		coordinates: { x: 0, y: 0 },
		scale: 1,
		distance: 48, // in rem
		scaleOffset: 1.5,
	},
	weight: 450,
	invert: false,
	sections: [
		{
			name: "home",
			description: null,
			content: {},
		},
		{
			name: "concept",
			description:
				"The most effective font is the one you don’t notice. No super high x-height, no geometric construction, no eye-catching design and no confusing ligatures. Designed to be neutral and anonymous, Commit Mono is quietly useful.",
			content: {},
		},
		{
			name: "familiar",
			description:
				"All research suggests the most familiar fonts are the ones you read fastest and most precisely. Commit Mono takes inspiration in fonts tested by time.",
			content: {
				timeline: [
					{
						name: "franklin_gothic",
						src: "franklin_gothic.svg",
						description: [
							"Franklin Gothic, 1896.",
							"Tried-and-true, but overly traditional for code.",
							"Inspiration was taken from most of the letter constructions, such as 'g'.",
						],
					},
					{
						name: "letter_gothic",
						src: "letter_gothic.svg",
						description: [
							"Letter Gothic, 1956.",
							"Clear, simple and monospaced, but too quirky.",
							"The first simple monospaced sans-serif. Inspiration was taken in the simple shapes.",
						],
					},
					{
						name: "fira_mono",
						src: "fira_mono.svg",
						description: [
							"Fira Mono, 2013.",
							"Great letter distinction, but overly complex and unique.",
							"Inpiration was taken in the way Fira handles monospace symbols.",
						],
					},
					{
						name: "untitled_sans",
						src: "untitled_sans.svg",
						description: [
							"Untitled Sans, 2017.",
							"Intentionally neutral, but not optimised for code.",
							"Inspiration was taken in its neutral nature.",
						],
					},
					{
						name: "commit_mono",
						src: "commit_mono.svg",
						description: [
							"Commit Mono, 2023.",
							"Neutral and functional, created and tested for code.",
							"Commit Mono takes the best of all the fonts before it and merges it into a clean pakage.",
						],
					},
				],
			},
		},
		{
			name: "intelligent",
			description:
				"Commit Mono uses an innovated technique to improve kerning. Kerning and spacing is crucial to a good reading experience but it’s not possible in monospaced fonts. Smart kerning combats this by sliding letters to better spacing positions – preserving monospacing. This way, Commit Mono reads more like the proportional fonts you’re used to reading.",
			content: {},
		},
		{
			name: "code",
			description:
				"Commit Mono is designed and tested for code first. Characters frequently used in code have been given extra care to look distinct and neat.",
			content: {
				characters: [
					{ value: "0", name: "zero" },
					{ value: "1", name: "one" },
					{ value: "2", name: "two" },
					{ value: "3", name: "three" },
					{ value: "@", name: "at" },
					{ value: "$", name: "dollar" },
					{ value: "?", name: "question" },
					{ value: '"', name: "quotedbl" },
					{ value: "+", name: "plus" },
					{ value: "%", name: "percent" },
					{ value: "*", name: "asterisk" },
					{ value: "-", name: "hyphen" },
					{ value: "(", name: "parenleft" },
					{ value: "[", name: "bracketleft" },
					{ value: "{", name: "braceleft" },
					{ value: "/", name: "slash" },
					{ value: "|", name: "bar" },
					{ value: "~", name: "asciitilde" },
					{ value: "&", name: "ampersand" },
					{ value: ";", name: "semicolon" },
					{ value: "#", name: "numbersign" },
					{ value: "`", name: "grave" },
					{ value: "<", name: "less" },
				],
			},
		},
		{
			name: "distinction",
			description:
				"With simple letter constructions and confident choices Commit Mono emphasises character distinction without compromising style consistency.",
			content: {
				waterfall: {
					sizes: [4, 2.5, 1.5, 1, 0.75, 0.5],
					text: `l1I|L!i\nOo0QØøΩ\n:;.,${"`"}‘'`,
				},
				gtc: [
					{ value: ["-", "–"], options: ["hyphen", "endash"] },
					{ value: ["`", "'"], options: ["backtick", "single quote"] },
					{ value: ["O", "0"], options: ["uppercase o", "zero"] },
					{ value: ["‹", "<"], options: ["angle quotation mark", "less"] },
					{ value: ["⁄", "/"], options: ["fraction", "slash"] },
					{ value: ["ß", "B"], options: ["german double s", "uppercase b"] },
				],
			},
		},
		{
			name: "customize",
			description:
				"So, how does it look in code? Change the settings below and download when you're satisfied. Alternate characters will be baked in and features merged, making a single static font that is compatible in all environments.",
			content: {
				fonts: [
					{
						name: "Commit Mono",
						file: "CommitMonoV102-VF.woff2",
						id: "commit_mono",
					},
					{
						name: "Fira Code",
						file: "FiraCode.woff2",
						id: "fira_code",
					},
					{
						name: "JetBrains Mono",
						file: "JetBrainsMono.woff2",
						id: "jetbrains_mono",
					},
					{
						name: "Source Code Pro",
						file: "SourceCodePro.woff2",
						id: "source_code_pro",
					},
					{
						name: "Consolas",
						file: "Consolas.woff2",
						id: "consolas",
					},
				],
				features: [
					{ type: "alternate", name: "a", label: "alt. 'a'", feature: "cv01", on: false },
					{ type: "alternate", name: "g", label: "alt. 'g'", feature: "cv02", on: false },
					{ type: "alternate", name: "square", label: "square dots .:ij", feature: "cv03", on: false },
					{ type: "alternate", name: "asterisk", label: "lifted *", feature: "cv04", on: false },
					{ type: "alternate", name: "at", label: "standard @", feature: "cv05", on: false },
					{ type: "alternate", name: "six", label: "alt. '6', '9'", feature: "cv06", on: false },
					{ type: "feature", name: "arrows", label: "Arrows >-> =>", feature: "ss01", on: false },
					{ type: "feature", name: "less_equal", label: "Ligatures <= != ", feature: "ss02", on: false },
					{ type: "feature", name: "case", label: "Smart case (1:1) 2+3", feature: "ss03", on: true },
					{ type: "feature", name: "ellipsis", label: "Symbol spacing ... <<", feature: "ss04", on: true },
					{ type: "feature", name: "smartkerning", label: "Smart kerning immi", feature: "ss05", on: true },
				],
				languages: [
					{
						languageName: "JavaScript",
						codeExample: `const isPalindromic = (number) => {
    if (number <= 1) {
        console.log("Usage: please input a non-negative integer");
        process.exit(1);
    }

    let reverse_number = 0, temp = number;
    while (temp > 0) {
        reverse_number = (reverse_number * 10) + (temp % 10);
        temp = Math.floor(temp / 10);
    }

    if (reverse_number == number)
        return true;
    else
        return false;

};

const input = process.argv[2];
let number = Number(input)

if (input !== '' && Number.isInteger(number) && number >= 0) {
    isPalindromic(input) ? console.log("true") : console.log("false");
} else {
    console.log("Usage: please input a non-negative integer")
}
`,
					},
					{
						languageName: "TypeScript",
						codeExample: `function fibonacci(num: number) {
    let n = Number(num)
    let elementOne: number = 0
    let elementTwo: number = 1
    let result: number = 0

    for (let i: number = 1; i <= n; i++) {
        result = elementOne + elementTwo
        elementOne = elementTwo
        elementTwo = result
        console.log(i + ": " + elementOne)
    }
}

let num_str = process.argv.length >= 3 ? process.argv[2] : ""
let num: number = parseInt(num_str)
if (isNaN(num)) {
    console.log("Usage: please input the count of fibonacci numbers to output")
    process.exit(0)
}

fibonacci(num)
`,
					},
					{
						languageName: "HTML/CSS",
						codeExample: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            @font-face {
                font-family: "CommitMono";
                src: url("/fonts/CommitMono.woff2");
                font-weight: 450;
            }
            :root {
                --grey: #aaa;
            }
            button#grey::before {
                content: "01";
                font-style: italic;
                font-size: 2rem;
                color: var(--grey);
            }
        </style>
    </head>
    <body>
        <button id="grey">Commit Mono</button>
    </body>
</html>
`,
					},
					{
						languageName: "Rust",
						codeExample: `// Requirement     https://sample-programs.therenegadecoder.com/projects/prime-number/
// Accept a number on command line and print if it is Composite or Prime 
// Works till  39 digits, ...

use std::env::args;
use std::process::exit;
use std::str::FromStr;

fn usage() -> ! {
    println!("Usage: please input a non-negative integer");
    exit(0);
}

fn parse_int<T: FromStr>(s: &str) -> Result<T, <T as FromStr>::Err> {
    s.trim().parse::<T>()
}

fn main() {
    let mut args = args().skip(1);

    // Exit if 1st command-line argument not an positive integer
    let input_num: u128 = args
        .next()
        .and_then(|s| parse_int(&s).ok())
        .unwrap_or_else(|| usage());

    if input_num < 2 || (input_num != 2 && input_num % 2 == 0) {
        println!("Composite");
        exit(0);
    }

    let mut n = 3u128;
    while n * n <= input_num {
        if input_num % n == 0 {
            println!("Composite");
            exit(0);
        }
        n += 2;
    }
    println!("Prime");
}
`,
					},
					{
						languageName: "Python",
						codeExample: `import sys
from math import sqrt, ceil


def is_prime(x):
    if (x % 2 == 0 and x is not 2) or (x == 1):
        return False
    return not bool([n for n in range(3, int(ceil(sqrt(x))+1)) if x % n == 0])


def exit_with_error():
    print('Usage: please input a non-negative integer')
    sys.exit(1)


def main(args):
    try:
        x = int(args[0])
        if x < 0:
            exit_with_error()
        print("Prime" if is_prime(x) else "Composite")
    except (IndexError, ValueError):
        exit_with_error()


if __name__ == "__main__":
    main(sys.argv[1:])
`,
					},
					{
						languageName: "C++",
						codeExample: `#include <iostream>
#include <stdlib.h>
#include <string.h>

using namespace std;

int main(int argc, char **argv)
{
    if (argc == 1)
    {
        cout << "Usage: please input a non-negative integer\\n";
        return 1;
    }
    string tmp = argv[1];
    if (argc == 1 || argv[1][0] == '\\0' || (atoi(argv[1]) == 0 && strcmp(argv[1], "0") != 0) || atoi(argv[1]) < 0 || tmp.find(".") != string::npos)
    {
        cout << "Usage: please input a non-negative integer\\n";
    }
    else
    {
        int input = atoi(argv[1]);
        if (input == 0 || input == 1)
        {
            cout << "composite\\n";
            return 0;
        }
        for (int i = 2; i < input; ++i)
        {
            if (input % i == 0)
            {
                cout << "composite\\n";
                return 0;
            }
        }
        cout << "Prime\\n";
    }

    return 0;
}
`,
					},
					{
						languageName: "Kotlin",
						codeExample: `fun main(args: Array<String>) 
{
    if (args.isNullOrEmpty() || args[0].isBlank() || args[0].toIntOrNull()?.takeIf { it >= 0 } == null) {
        println("Usage: please input a non-negative integer")
        return
    }

    val num = args[0].toInt()
    if(num>1)
    {
        for(i in 2 until num)
        {
            if(num%i == 0)
            {
                println("Composite")
                return
            }
        }
        println("Prime")
    }
    else
    {
        println("Composite")
    }
}
`,
					},
					{
						languageName: "Java",
						codeExample: `class PrimeNumberException extends Exception {
}

public class PrimeNumber {

    public static boolean isPrime(int number) {
        if ((number % 2 == 0 && number != 2) || number == 1) {
            return false;
        }

        boolean foundFactor = false;
        for (int n = 3; n <= (int) Math.ceil(Math.sqrt(number)); ++n) {
            if ((number % n) == 0) {
                foundFactor = true;
                break;
            }
        }
        return !foundFactor;
    }

    public static void main(String[] args) {
        try {

            if (args.length < 1 || args[0].indexOf('-') != -1) {
                throw new PrimeNumberException();
            }

            if (isPrime(Integer.valueOf(args[0]))) {
                System.out.println("Prime");

            } else {
                System.out.println("Composite");
            }

        } catch (NumberFormatException | PrimeNumberException e) {
            System.err.println("Usage: please input a non-negative integer");
        }
    }
}
`,
					},
					{
						languageName: "Ruby",
						codeExample: `ROMAN_VALUES = { "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000 }

def roman_valid?(roman_numbers)
    return false if roman_numbers.any? { |roman_number| !ROMAN_VALUES.keys.include?(roman_number.to_sym) }    
    return false if roman_numbers.join.include?('MMMM')
    
    counter_numbers = roman_numbers.tally # Only on ruby 2.7+
    unless counter_numbers['M'].nil?
        return false if counter_numbers['M'] > 4
    end
    
    counter_numbers.reject { |k| k == 'M' }.all? { |(_, counter)| counter <= 3 }
end

def roman_to_decimal(full_roman_number)
    return 'Usage: please provide a string of roman numerals' if full_roman_number.nil?
    return 0 if full_roman_number.empty?

    roman_numbers = full_roman_number.upcase.split('')
    return 'Error: invalid string of roman numerals' unless roman_valid?(roman_numbers)

    total = 0

    roman_numbers.each_with_index do |roman_number, index|
        current_value = ROMAN_VALUES[roman_number.to_sym]
        next_value = ROMAN_VALUES[roman_numbers[index+1]&.to_sym] || 0
        
        if (current_value >= next_value)
            total += current_value
        else
            total -= current_value
        end
    end

    total
end

print(roman_to_decimal(ARGV[0]))
`,
					},
					{
						languageName: "PHP",
						codeExample: `<?php

/**
 * Function to determine if a number if prime.
 * @param int positive integer.
 * @return True if the number is prime, False otherwise.
 */
function is_prime($num)
{
    if (($num % 2 == 0 && $num != 2) || ($num == 1)) {
        return false;
    }

    $found_factor = false;
    for ($n = 3; $n <= intval(ceil(sqrt($num))); ++$n) {
        if (($num % $n) == 0) {
            $found_factor = true;
            break;
        }
    }

    return !$found_factor;
}

// Check argument
if ($argc < 2 || !is_numeric($argv[1]) || strpos($argv[1], '.') !== false || strpos($argv[1], '-') !== false) {
    echo "Usage: please input a non-negative integer\n";
    exit(1);
}

// Convert the string
if (is_prime(intval($argv[1]))) {
    echo "Prime\n";

} else {
    echo "Composite\n";
}

exit(0);
`,
					},
					{
						languageName: "Fortran",
						codeExample: `! upcase and to_upper didn't work, 
! had to resort to check ASCII value of first letter & then
! subtract 32 from it, ... 
program capitalize
character(len=100) :: cmd
character(len=1) :: firstletter
character(len=:), allocatable :: printoutput

! Anything not equal to single argument, Print Error
IF(COMMAND_ARGUMENT_COUNT().NE.1)THEN
    write(*,'(g0.8)')"Usage: please provide a string"
    STOP
ENDIF

CALL GET_COMMAND_ARGUMENT(1,cmd)
if (cmd == "") then
    write(*,'(g0.8)')"Usage: please provide a string"
    STOP
endif
! Get first letter
    firstletter = cmd(1:1)
    ! Check if first letter is between ASCII Value of a and z
    if (iachar(firstletter)>= iachar("a") .and. iachar(firstletter)<=iachar("z") ) then
    ! Subtract 32 from ASCII Value, to convert it to respective capital letter
        firstletter = achar(iachar(firstletter)-32)
! Overwrite the first letter 
        cmd(1:1) = firstletter
    end if
        printoutput = adjustl(trim(cmd))
        write(*,'(g0.8)')printoutput
end program capitalize
`,
					},
					{
						languageName: "Blank",
						codeExample: `Focus, then press e to edit




















`,
					},
				],
			},
		},
		{
			name: "install",
			description: "A short guide for how to install and enable Commit Mono.",
			content: {
				steps: ["Download the font from the download section.", "Install the font:"],
			},
		},
		{
			name: "about",
			description:
				"Commit Mono is a project by Eigil Nikolajsen. Eigil is a creative developer and designer from Denmark with a particular interest in type design. He holds a bachelor degree in Interactive Design from the Danish School of Media and Journalism in 2023.",
			content: {},
		},
	],
}
