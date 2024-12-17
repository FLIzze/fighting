class Player {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
        this.cords = { x: 0, y: 0 };
        this.size = { width: 75, height: 150 };
        this.velocity = { x: 0, y: 0 };
        this.fallSpeed = 130;
        this.moveSpeed = 450;
        this.jumpSpeed = 175;
        this.isJumping = true;
    }

    /**
     * @param {number} deltaTime
     **/
    updatePosition(deltaTime) {
        this.cords.x += this.velocity.x * deltaTime / 1000;
        this.cords.y += this.velocity.y * deltaTime / 1000;
    }

    /**
     * @param {number} x
     * @param {number} y
     **/
    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    canMove() {
        //TODO
    }

    jump() {
        //TODO
    }

    moveLeft() {
        console.log('moveLeft');
        this.velocity.x = -this.moveSpeed;
    }

    moveRight() {
        console.log('moveRight');
        this.velocity.x = this.moveSpeed;
    }

    stop() {
        console.log('stop');
        this.velocity.x = 0;
    }
}

export default Player;
