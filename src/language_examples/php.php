<?php

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