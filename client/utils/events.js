import Player from "../classes/player.js";

/**
 * @param {Player} player
 **/
function playerMoveEvent(player) {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a':
                player.velocity.x = -player.moveSpeed;
                break;
            case 'd':
                player.velocity.x = player.moveSpeed;
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'a' || event.key === 'd') {
            player.velocity.x = 0; 
        }
    });
}

export default playerMoveEvent;
