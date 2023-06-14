// Requirement     https://sample-programs.therenegadecoder.com/projects/prime-number/
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