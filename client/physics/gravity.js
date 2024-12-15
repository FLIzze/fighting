import Player from "../classes/player.js";

/**
 * @param {Player[]} players
 **/
function addGravity(players, floor) {
    players.forEach(player => {
        if (player.cords.y + player.size.height >= floor) { 
            player.velocity.y = 0;
            player.isJumping = false;
            return;
        };

        if (!player.isJumping) return;
        player.velocity.y += player.fallSpeed;
    });
}

function updatePosition(players, deltaTime) {
    players.forEach(player => {
        player.updatePosition(deltaTime);
    });
}

export { addGravity, updatePosition };
