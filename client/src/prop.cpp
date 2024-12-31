#include "prop.h"

Prop::Prop(Coords cords, Size size) : cords(cords), size(size) {
        shape.setSize(sf::Vector2f(size.width, size.height));
        shape.setFillColor(sf::Color::Blue);
        shape.setPosition(cords.x, cords.y);
    }

void Prop::draw(sf::RenderWindow& window) {
    window.draw(shape); 
}
