
/**
 * @param {Player} player
 * @param {Props} props
 * @returns {boolean}
 **/
function checkCollisions(player, props) {
    for (let prop of props.getProps()) {
        if (player.cords.x < prop.x + prop.width &&
            player.cords.x + player.size.width > prop.x &&
            player.cords.y < prop.y + prop.height &&
            player.cords.y + player.size.height > prop.y) {
            console.log('Collision detected!');
            return true;
        }
    }

    return false;
}

export default checkCollisions;
