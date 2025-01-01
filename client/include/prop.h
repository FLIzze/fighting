#ifndef PROP_H
#define PROP_H

#include <SFML/Graphics.hpp>
#include <SFML/Graphics/RectangleShape.hpp>
#include "structs.h"

using namespace std;

class Prop {
    public:
        Coords cords;
        Size size;
        sf::RectangleShape shape;

        Prop(Coords cords, Size size);

        void draw(sf::RenderWindow& window);
};

#endif
