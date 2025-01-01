#include <SFML/Graphics.hpp>
#include "player.h"
#include "prop.h"

int main() {
    sf::RenderWindow window(sf::VideoMode({800, 600}), "My window");
    sf::Clock clock;

    Player player1({ 0, 0 }, { 50, 100 });
    std::vector<Player> players = { player1 };

    Prop platform1({0, 500}, {400, 20});
    Prop wall({200, 200}, {50, 150});
    Prop platform2({400, 400}, {200, 20});
    std::vector<Prop> props = { platform1, platform2, wall };

    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();
        }
        sf::Time deltaTime = clock.restart();

        window.clear(sf::Color::Black);

        for (auto& player : players) {
            player.gravity(deltaTime);
            player.updatePosition(deltaTime);
            player.handleMovements();
            player.draw(window);
            player.handleCollisions(props);
        }

        for (auto& prop : props) {
            prop.draw(window);
        }

        window.display();
    }

    return 0;
}
