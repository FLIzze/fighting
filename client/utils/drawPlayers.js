import Player from "../classes/player.js";

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Player[]} players
 * @param {HTMLCanvasElement} canvas
 **/
function drawPlayers(ctx, players) {
    players.forEach(player => {
        if (player.name === 'John') ctx.fillStyle = 'blue';
        if (player.name === 'Doe') ctx.fillStyle = 'red';
        ctx.fillRect(player.cords.x, player.cords.y, player.size.width, player.size.height);
    });
};

export default drawPlayers;
