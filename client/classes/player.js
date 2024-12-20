import Prop from "./prop.js";

class Player {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
        this.cords = { x: 0, y: 0 };
        this.size = { width: 75, height: 150 };
        this.velocity = { x: 0, y: 0 };
        this.fallSpeed = 1630;
        this.moveSpeed = 450;
        this.jumpSpeed = 1005;
        this.isJumping = true;
    }

    /**
     * @param {number} deltaTime
     **/
    addGravity(deltaTime) {
        this.velocity.y += this.fallSpeed * deltaTime / 1000;
    }

    jump() {
        if (!this.isJumping && this.velocity.y === 0) {
            this.velocity.y = -this.jumpSpeed;
            this.isJumping = true;
        }
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

    /**
     * @param {Prop[]} props
     * @param {'left' | 'right' | 'up' | 'down'} direction
     * @returns {boolean}
     **/
    checkCollisions(props, direction) {
        const padding = 5;
        for (const prop of props) {
            if (
                direction === 'down' &&
                this.cords.x < prop.cords.x + prop.size.width &&
                this.cords.x + this.size.width > prop.cords.x &&
                this.cords.y < prop.cords.y + prop.size.height &&
                this.cords.y + this.size.height + padding > prop.cords.y
            ) {
                this.cords.y = prop.cords.y - this.size.height;
                return true;
            }

            if (
                direction === 'up' &&
                this.cords.x < prop.cords.x + prop.size.width &&
                this.cords.x + this.size.width > prop.cords.x &&
                this.cords.y > prop.cords.y &&
                this.cords.y - padding < prop.cords.y + prop.size.height
            ) {
                this.cords.y = prop.cords.y + prop.size.height;
                return true;
            }

            if (
                direction === 'right' &&
                this.cords.x < prop.cords.x + prop.size.width &&
                this.cords.x + this.size.width + padding > prop.cords.x &&
                this.cords.y < prop.cords.y + prop.size.height &&
                this.cords.y + this.size.height > prop.cords.y
            ) {
                this.cords.x = prop.cords.x - this.size.width;
                return true;
            }

            if (
                direction === 'left' &&
                this.cords.x > prop.cords.x &&
                this.cords.x - padding < prop.cords.x + prop.size.width &&
                this.cords.y < prop.cords.y + prop.size.height &&
                this.cords.y + this.size.height > prop.cords.y
            ) {
                this.cords.x = prop.cords.x + prop.size.width;
                return true;
            }
        }
        return false;
    }

    /**
     * @param {Prop[]} props
     * @param {number} deltaTime
     **/
    updatePosition(deltaTime) {
        this.cords.x += this.velocity.x * deltaTime / 1000;
        this.cords.y += this.velocity.y * deltaTime / 1000;
    }

    /**
     * @param {Prop[]} props
     **/
    handleCollisions(props) {
        if (this.velocity.y > 0 && this.checkCollisions(props, 'down')) {
            this.velocity.y = 0;
            this.isJumping = false;
        } else if (this.velocity.y < 0 && this.checkCollisions(props, 'up')) {
            this.velocity.y = 0;
        }

        if (this.velocity.x > 0 && this.checkCollisions(props, 'right')) {
            this.velocity.x = 0;
        } else if (this.velocity.x < 0 && this.checkCollisions(props, 'left')) {
            this.velocity.x = 0;
        }
    }
}

export default Player;
