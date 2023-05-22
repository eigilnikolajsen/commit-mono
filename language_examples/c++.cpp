#include <iostream>
#include <stdlib.h>
#include <string.h>

using namespace std;

int main(int argc, char **argv)
{
    if (argc == 1)
    {
        cout << "Usage: please input a non-negative integer\n";
        return 1;
    }
    string tmp = argv[1];
    if (argc == 1 || argv[1][0] == '\0' || (atoi(argv[1]) == 0 && strcmp(argv[1], "0") != 0) || atoi(argv[1]) < 0 || tmp.find(".") != string::npos)
    {
        cout << "Usage: please input a non-negative integer\n";
    }
    else
    {
        int input = atoi(argv[1]);
        if (input == 0 || input == 1)
        {
            cout << "composite\n";
            return 0;
        }
        for (int i = 2; i < input; ++i)
        {
            if (input % i == 0)
            {
                cout << "composite\n";
                return 0;
            }
        }
        cout << "Prime\n";
    }

    return 0;
}