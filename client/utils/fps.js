/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} fps
 **/
function displayFPS(ctx, fps) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`FPS: ${Math.round(fps)}`, 10, 30);
}

export default displayFPS;
