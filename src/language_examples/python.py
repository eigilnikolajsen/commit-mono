import sys
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