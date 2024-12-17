import Player from "../classes/player.js";

/**
 * @param {Player} player
 **/
function playerMoveEvent(player) {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a':
                player.moveLeft();
                break;
            case 'd':
                player.moveRight();
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'a' || event.key === 'd') {
            player.stop();
        }
    });
}

export default playerMoveEvent;
