class Player {
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

    updatePosition(deltaTime) {
        this.cords.x += this.velocity.x * deltaTime / 1000;
        this.cords.y += this.velocity.y * deltaTime / 1000;
    }

    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }
}

export default Player;
