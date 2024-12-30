#ifndef PLAYER_H
#define PLAYER_H

#include <string>

using namespace std;

struct Coords 
{
    int x, y;
};

struct Size 
{
    int width, height;
};

class Player
{
    public:
        string name;
        Coords cords;
        Size size;

        Player(string playerName, int x = 0, int y = 0, int width = 0, int height = 0)
            : name(playerName), cords{ x, y }, size { width, height } {}
};

#endif
