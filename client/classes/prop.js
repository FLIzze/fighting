class Prop {
    /**
     * @param {{ x: number, y: number }} cords
     * @param {{ width: number, height: number }} size
     **/
    constructor(cords, size) {
        this.cords = cords;
        this.size = size;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     **/
    draw(ctx) {
        ctx.fillRect(this.cords.x, this.cords.y, this.size.width, this.size.height);
    }
}

export default Prop;
