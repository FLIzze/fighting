#include "player.h"
#include "Window/Keyboard.hpp"
#include <iostream>

Player::Player(string playerName, Coords cords, Size size, Velocity velocity)
    : name(playerName), cords(cords), size(size), velocity(velocity) {
        shape.setFillColor(sf::Color::Green);
        shape.setSize(sf::Vector2f(size.width, size.height));
        isJumping = true;
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
    const int GRAVITY_STRENGTH = 400;
    velocity.y += GRAVITY_STRENGTH * deltaTime.asSeconds();
}

void Player::updatePosition(sf::Time deltaTime) {
    cords.x += velocity.x * deltaTime.asSeconds();
    cords.y += velocity.y * deltaTime.asSeconds();

    const int TERMINAL_VELOCITY = 750;
    if (velocity.y > TERMINAL_VELOCITY) {
        velocity.y = TERMINAL_VELOCITY;
    }

    shape.setPosition(cords.x, cords.y);
}

void Player::handleCollisions(Prop prop) {
    if (velocity.y > 0 && checkCollisions(prop, "down")) {
        velocity.y = 0;
        isJumping = false;
    } else if (velocity.x > 0 && checkCollisions(prop, "right")) {
        velocity.x = 0;
    } else if (velocity.x < 0 && checkCollisions(prop, "left")) {
        velocity.x = 0;
    } else if (velocity.y < 0 && checkCollisions(prop, "up")) {
        velocity.y = 0;
    }
}

bool Player::checkCollisions(Prop prop, string direction) {
    const int padding = 2;
    if (
            direction == "down" &&
            cords.x < prop.cords.x + prop.size.width &&
            cords.x + size.width > prop.cords.x &&
            cords.y < prop.cords.y + prop.size.height &&
            cords.y + size.height + padding > prop.cords.y
       ) {
        return true;
    }

    if (
            direction == "right" &&
            cords.x < prop.cords.x + prop.size.width &&
            cords.x + size.width + padding > prop.cords.x &&
            cords.y < prop.cords.y + prop.size.height &&
            cords.y + size.height > prop.cords.y
       ) {
        return true;
    }

    if (
            direction == "left" &&
            cords.x < prop.cords.x + prop.size.width + padding &&
            cords.x + size.width > prop.cords.x &&
            cords.y < prop.cords.y + prop.size.height &&
            cords.y + size.height > prop.cords.y
       ) {
        return true;
    }

    if (
            direction == "up" &&
            cords.x < prop.cords.x + prop.size.width &&
            cords.x + size.width > prop.cords.x &&
            cords.y < prop.cords.y + prop.size.height + padding &&
            cords.y + size.height > prop.cords.y
       ) {
        return true;
    }

    return false;
}

void Player::move(string direction) {
    const int WALKING_SPEED = 250;
    const int JUMP_STRENGTH = 350;

    if (direction == "left") {
        velocity.x = -WALKING_SPEED;
    } else if (direction == "right") {
        velocity.x = WALKING_SPEED;
    } else if (direction == "up") {
        isJumping = true;
        velocity.y = -JUMP_STRENGTH;
    }
}

void Player::handleMovements() {
    velocity.x = 0;

    const bool moveLeft = sf::Keyboard::isKeyPressed(sf::Keyboard::A);
    const bool moveRight = sf::Keyboard::isKeyPressed(sf::Keyboard::D);

    if (moveLeft && !moveRight) {
        move("left");
    } else if (moveRight && !moveLeft) {
        move("right");
    }

    if (sf::Keyboard::isKeyPressed(sf::Keyboard::W)) {
        if (!isJumping) {
            move("up");
        }
    }
}
