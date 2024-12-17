import Player from './classes/player.js'
import { addGravity, updatePosition } from './utils/physics/gravity.js';
import { drawPlayers, drawProps } from './utils/draw.js';
import playerMoveEvent from './utils/events.js';
import displayFPS from './utils/fps.js';
import Props from './classes/props.js';

const /** @type {Player[]} **/ players = [];

const player1 = new Player('John');
const player2 = new Player('Doe');
player2.cords.x = 100;
players.push(player1);
players.push(player2);

const props = new Props();
props.addProp({ x: 200, y: 200, width: 50, height: 50 });
props.addProp({ x: 300, y: 300, width: 50, height: 750 });
console.log(props.getProps());

const canvas = document.getElementById('canvas');
if (!canvas) { throw new Error('Canvas not found!'); }
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const /** @type {CanvasRenderingContext2D} **/ ctx = canvas.getContext('2d');

playerMoveEvent(player1);

let lastFrameTime = performance.now();
let fps = 0;

function AnimationLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    fps = Math.floor(1000 / deltaTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePosition(players, deltaTime);
    addGravity(players, canvas);
    drawPlayers(ctx, players, canvas);
    drawProps(ctx, props);

    displayFPS(ctx, fps);

    requestAnimationFrame(AnimationLoop);
}

AnimationLoop();
