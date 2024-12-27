import Player from './classes/player.js'
import Prop from './classes/prop.js';
import playerMoveEvent from './utils/events.js';
import displayFPS from './utils/fps.js';

const canvas = document.getElementById('canvas');
if (!canvas) { throw new Error('Canvas not found!'); }
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const /** @type {CanvasRenderingContext2D} **/ ctx = canvas.getContext('2d');

const /** @type {Player[]} **/ players = [];
// const player = new Player('James');
// players.push(player);

const /** @type {Prop[]} **/ props = [];
const floor = new Prop({ x: 0, y: 700 }, { width: 1400, height: 50 });
const wall = new Prop({ x: 300, y: 400 }, { width: 50, height: 100 });
const wall2 = new Prop({ x: 600, y: 500 }, { width: 50, height: 200 });
const wall3 = new Prop({ x: 900, y: 700 }, { width: 50, height: 300 });
const wall4 = new Prop({ x: 1200, y: 400 }, { width: 50, height: 400 });
props.push(floor, wall, wall2, wall3, wall4);

let lastFrameTime = performance.now();
let fps = 0;

const updatePlayerMovement = playerMoveEvent();

function AnimationLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    fps = Math.floor(1000 / deltaTime);

    updatePlayerMovement(player);

    ctx.fillStyle = 'blue';

    players.forEach(player => {
        player.clear(ctx);
        player.addGravity(deltaTime);
        player.handleCollisions(props);
        player.updatePosition(deltaTime);
        player.draw(ctx);
    });

    ctx.fillStyle = 'green';

    props.forEach(prop => {
        prop.draw(ctx);
    });

    displayFPS(ctx, fps);

    requestAnimationFrame(AnimationLoop);
}

AnimationLoop();
