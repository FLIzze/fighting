#ifndef PLAYER_H
#define PLAYER_H

#include <SFML/Graphics/RectangleShape.hpp>
#include <string>
#include <SFML/Graphics.hpp>
#include "structs.h"
#include "prop.h"
#include "enums.h"

using namespace std;

class Player {
    public:
        string uuid;
        string name;
        Coords cords;
        Size size;
        Velocity velocity;
        bool isJumping;
        sf::RectangleShape shape;

        Player(string playerName, Coords cords = {0, 0}, Size size = {50, 100}, Velocity velocity = {0, 0});

        void display() const;
        void draw(sf::RenderWindow& window) const;

        void move(Direction direction);
        void handleMovements();

        void gravity(sf::Time deltaTime);
        void updatePosition(sf::Time deltaTime);
        void handleCollisions(std::vector<Prop>& prop);
        bool checkCollisions(Prop& prop, Direction direction);
};

#endif
