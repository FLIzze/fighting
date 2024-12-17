import Player from "../../classes/player.js";

/**
 * @param {Player[]} players
 * @param {HTMLCanvasElement} canvas
 **/
function addGravity(players, canvas) {
    players.forEach(player => {
        const floor = canvas.height - player.size.height
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
