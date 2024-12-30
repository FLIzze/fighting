#include <SFML/Graphics.hpp>
#include "player.h"

int main()
{
    sf::RenderWindow window(sf::VideoMode({800, 600}), "My window");

    sf::RectangleShape player(sf::Vector2f(50, 100));
    player.setFillColor(sf::Color::Green);
    player.setPosition(300, 250);

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        window.clear(sf::Color::Black);
        Player player1("John");
        window.display();
    }

    return 0;
}
