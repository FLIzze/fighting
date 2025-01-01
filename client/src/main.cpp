#include <SFML/Graphics.hpp>
#include "player.h"
#include "prop.h"

int main() {
    sf::RenderWindow window(sf::VideoMode({800, 600}), "My window");
    sf::Clock clock;

    Player player1("John");

    Prop platform1({0, 500}, {400, 20});
    Prop platform2({400, 400}, {200, 20});
    std::vector<Prop> props = { platform1, platform2 };

    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();
        }
        sf::Time deltaTime = clock.restart();

        window.clear(sf::Color::Black);

        player1.gravity(deltaTime);
        player1.updatePosition(deltaTime);
        player1.handleMovements();

        for (int i = 0; i < props.size(); i++) {
            props[i].draw(window);
            player1.handleCollisions(props[i]);
        }

        player1.draw(window);

        window.display();
    }

    return 0;
}
