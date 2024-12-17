let fpsFrameUpdate = 0;
let framesUntilUpdate = 5;

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} fps
 **/
function displayFPS(ctx, fps) {
    if (fpsFrameUpdate < framesUntilUpdate) {
        fpsFrameUpdate++;
        return;
    }

    ctx.clearRect(0, 0, 200, 100);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`FPS: ${Math.round(fps)}`, 10, 30);

    fpsFrameUpdate = 0;
}

export default displayFPS;
