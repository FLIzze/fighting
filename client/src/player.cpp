#include "player.h"
#include "Window/Keyboard.hpp"
#include <iostream>

constexpr int GRAVITY_STRENGTH = 400;
constexpr int WALKING_SPEED = 250;
constexpr int JUMP_STRENGTH = 350;
constexpr int TERMINAL_VELOCITY = 750;
constexpr int COLLISION_PADDING = 2;

Player::Player(string playerName, Coords cords, Size size, Velocity velocity)
: name(playerName), cords(cords), size(size), velocity(velocity) {
        shape.setFillColor(sf::Color::Green);
        shape.setSize(sf::Vector2f(size.width, size.height));
        isJumping = true;
    }

void Player::display() const {
    cout << "Player: " << name << "\n";
    cout << "Cords: " << cords.x << ", " << cords.y << "\n";
    cout << "Size: " << size.width << ", " << size.height << "\n";
    cout << "Velocity: " << velocity.x << ". " << velocity.y << "\n";
}

void Player::draw(sf::RenderWindow& window) const {
    window.draw(shape);
}

void Player::gravity(sf::Time deltaTime) {
    velocity.y += GRAVITY_STRENGTH * deltaTime.asSeconds();
}

void Player::updatePosition(sf::Time deltaTime) {
    cords.x += velocity.x * deltaTime.asSeconds();
    cords.y += velocity.y * deltaTime.asSeconds();

    if (velocity.y > TERMINAL_VELOCITY) {
        velocity.y = TERMINAL_VELOCITY;
    }

    shape.setPosition(cords.x, cords.y);
}

void Player::handleCollisions(std::vector<Prop>& props) {
    for (auto& prop : props) {
        if (velocity.y > 0 && checkCollisions(prop, Direction::Down)) {
            velocity.y = 0;
            isJumping = false;
        } else if (velocity.x > 0 && checkCollisions(prop, Direction::Right)) {
            velocity.x = 0;
        } else if (velocity.x < 0 && checkCollisions(prop, Direction::Left)) {
            velocity.x = 0;
        } else if (velocity.y < 0 && checkCollisions(prop, Direction::Up)) {
            velocity.y = 0;
        }
    }
}

bool Player::checkCollisions(Prop& prop, Direction direction) {
    switch (direction) {
        case Direction::Down:
            return cords.x < prop.cords.x + prop.size.width &&
                   cords.x + size.width > prop.cords.x &&
                   cords.y < prop.cords.y + prop.size.height &&
                   cords.y + size.height + COLLISION_PADDING > prop.cords.y;
            break;
        case Direction::Right:
            return cords.x < prop.cords.x + prop.size.width &&
                   cords.x + size.width + COLLISION_PADDING > prop.cords.x &&
                   cords.y < prop.cords.y + prop.size.height &&
                   cords.y + size.height > prop.cords.y;
            break;
        case Direction::Left:
            return cords.x < prop.cords.x + prop.size.width + COLLISION_PADDING &&
                   cords.x + size.width > prop.cords.x &&
                   cords.y < prop.cords.y + prop.size.height &&
                   cords.y + size.height > prop.cords.y;
            break;
        case Direction::Up:
            return cords.x < prop.cords.x + prop.size.width &&
                   cords.x + size.width > prop.cords.x &&
                   cords.y < prop.cords.y + prop.size.height + COLLISION_PADDING &&
                   cords.y + size.height > prop.cords.y;
            break;
        default:
            break;
    }
    return false;
}

void Player::move(Direction direction) {
    switch (direction) {
        case Direction::Left:
            velocity.x = -WALKING_SPEED;
            break;
        case Direction::Right:
            velocity.x = WALKING_SPEED;
            break;
        case Direction::Up:
            isJumping = true;
            velocity.y = -JUMP_STRENGTH;
            break;
        case Direction::Down:
            break;
        default:
            break;
    }
}

void Player::handleMovements() {
    velocity.x = 0;

    const bool moveLeft = sf::Keyboard::isKeyPressed(sf::Keyboard::A);
    const bool moveRight = sf::Keyboard::isKeyPressed(sf::Keyboard::D);

    if (moveLeft && !moveRight) {
        move(Direction::Left);
    } else if (moveRight && !moveLeft) {
        move(Direction::Right);
    }

    if (sf::Keyboard::isKeyPressed(sf::Keyboard::W)) {
        if (!isJumping) {
            move(Direction::Up);
        }
    }
}
