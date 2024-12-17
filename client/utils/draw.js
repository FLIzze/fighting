import Player from "../classes/player.js";
import Props from "../classes/props.js";

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

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Props} props
 **/
function drawProps(ctx, props) {
    props.getProps().forEach(prop => {
        ctx.fillStyle = 'green';
        ctx.fillRect(prop.x, prop.y, prop.width, prop.height);
    });
}

export { drawPlayers, drawProps };
