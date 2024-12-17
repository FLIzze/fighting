import Player from './classes/player.js'
import { updatePosition } from './utils/physics/gravity.js';
import { clearPlayers, drawPlayers, drawProps } from './utils/draw.js';
import playerMoveEvent from './utils/events.js';
import displayFPS from './utils/fps.js';
import Props from './classes/props.js';
import checkCollisions from './utils/physics/collisions.js';

const framerate = 60;

const canvas = document.getElementById('canvas');
if (!canvas) { throw new Error('Canvas not found!'); }
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const /** @type {CanvasRenderingContext2D} **/ ctx = canvas.getContext('2d');

const /** @type {Player[]} **/ players = [];
const player1 = new Player('John');
player1.cords.x = 200;
players.push(player1);

const props = new Props();
props.addProp({ x: 500, y: 400, width: 50, height: 950 });
props.addProp({ x: 0, y: 400, width: 50, height: 950 });
console.log(props.getProps());

playerMoveEvent(player1);

let lastFrameTime = performance.now();
let fps = 0;

function AnimationLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    fps = Math.floor(1000 / deltaTime);

    clearPlayers(players, ctx);

    checkCollisions(player1, props);
    updatePosition(players, deltaTime, canvas);

    drawPlayers(ctx, players, canvas);
    drawProps(ctx, props);

    displayFPS(ctx, fps);

    setTimeout(() => {
        requestAnimationFrame(AnimationLoop);
    }, 1000 / framerate);
}

AnimationLoop();
