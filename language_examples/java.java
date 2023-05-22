class PrimeNumberException extends Exception {
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