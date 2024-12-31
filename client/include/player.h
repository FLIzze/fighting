#ifndef PLAYER_H
#define PLAYER_H

#include <SFML/Graphics/RectangleShape.hpp>
#include <string>
#include <SFML/Graphics.hpp>
#include <iostream>
#include "structs.h"

using namespace std;

class Player {
    public:
        string uuid;
        string name;
        Coords cords;
        Size size;
        Velocity velocity;
        sf::RectangleShape shape;

        Player(string playerName, Coords cords = {0, 0}, Size size = {50, 100}, Velocity velocity = {0, 0});

        void display();
        void draw(sf::RenderWindow& window);
        void clear(sf::RenderWindow& window);

        void gravity(sf::Time deltaTime);
        void updatePosition(sf::Time deltaTime);
};

#endif
