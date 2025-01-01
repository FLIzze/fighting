#include "player.h"
#include <iostream>

Player::Player(string playerName, Coords cords, Size size, Velocity velocity)
    : name(playerName), cords(cords), size(size), velocity(velocity) {
        shape.setFillColor(sf::Color::Green);
        shape.setSize(sf::Vector2f(size.width, size.height));
    }

void Player::display() {
    cout << "Player: " << name << "\n";
    cout << "Cords: " << cords.x << ", " << cords.y << "\n";
    cout << "Size: " << size.width << ", " << size.height << "\n";
}

void Player::draw(sf::RenderWindow& window) {
    window.draw(shape);
}

void Player::gravity(sf::Time deltaTime) {
    const float GRAVITY_STRENGTH = 250.0f;
    velocity.y += GRAVITY_STRENGTH * deltaTime.asSeconds();
}

void Player::updatePosition(sf::Time deltaTime) {
    cords.x += velocity.x * deltaTime.asSeconds();
    cords.y += velocity.y * deltaTime.asSeconds();

    const float TERMINAL_VELOCITY = 600.0f;
    if (velocity.y > TERMINAL_VELOCITY) {
        velocity.y = TERMINAL_VELOCITY;
    }

    shape.setPosition(cords.x, cords.y);
}

void Player::handleCollisions(Prop prop) {
    if (velocity.y > 0 && checkCollisions(prop, "down")) {
        velocity.y = 0;
    }
}

bool Player::checkCollisions(Prop prop, string direction) {
    const int padding = 10;
    if (
            direction == "down" &&
            cords.x < prop.cords.x + prop.size.width &&
            cords.x + size.width > prop.cords.x &&
            cords.y < prop.cords.y + prop.size.height &&
            cords.y + size.height + padding > prop.cords.y
       ) {
        cords.y = prop.cords.y - size.height;
        return true;
    }

    return false;
}
