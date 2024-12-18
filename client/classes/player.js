class Player {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
        this.cords = { x: 0, y: 0 };
        this.size = { width: 75, height: 150 };
        this.velocity = { x: 0, y: 0 };
        this.fallSpeed = 730;
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
     * @param {number} deltaTime
     * @param {HTMLCanvasElement} canvas
     **/
    addGravity(deltaTime, canvas) {
        const floor = canvas.height - this.size.height;

        if (this.cords.y + this.size.height >= floor) {
            this.velocity.y = 0;
            this.isJumping = false;
            return;
        }

        if (!this.isJumping) return;
        this.velocity.y += this.fallSpeed * deltaTime / 1000;
    }

    /**
     * @param {number} x
     * @param {number} y
     **/
    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    /**
     * @returns { [ x: number, y: number ] }
     **/
    getVelocity() {
        return [this.velocity.x, this.velocity.y]
    }

    jump() {
        //TODO
    }

    moveLeft() {
        this.velocity.x = -this.moveSpeed;
    }

    moveRight() {
        this.velocity.x = this.moveSpeed;
    }

    stop() {
        this.velocity.x = 0;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     **/
    draw(ctx) {
        ctx.fillRect(this.cords.x, this.cords.y, this.size.width, this.size.height);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     **/
    clear(ctx) {
        const padding = 10;
        ctx.clearRect(
            this.cords.x - padding, 
            this.cords.y - padding, 
            this.size.width + 2 * padding, 
            this.size.height + 2 * padding
        );
    }
}

export default Player;
