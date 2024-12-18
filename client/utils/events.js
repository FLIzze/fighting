import Player from "../classes/player.js";

const keyState = {
    left: false,
    right: false
};

function playerMoveEvent() {
    function onKeyDown(event) {
        switch (event.key) {
            case 'a':
                keyState.left = true;
                break;
            case 'd':
                keyState.right = true;
                break;
        }
    }

    function onKeyUp(event) {
        switch (event.key) {
            case 'a':
                keyState.left = false;
                break;
            case 'd':
                keyState.right = false;
                break;
        }
    }

    /**
     * @param {Player} player
     **/
    function updatePlayerMovement(player) {
        if (keyState.left && !keyState.right) {
            player.moveLeft();  
        } else if (keyState.right && !keyState.left) {
            player.moveRight();  
        } else {
            player.stop();  
        }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return updatePlayerMovement;
}

export default playerMoveEvent;

