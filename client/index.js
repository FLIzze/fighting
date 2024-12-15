import Player from './classes/player.js';
import { addGravity, updatePosition } from './physics/gravity.js';
import drawPlayers from './utils/drawPlayers.js';
import playerMoveEvent from './utils/events.js';
import displayFPS from './utils/fps.js';

const /** @type {Player[]} **/ players = [];

const player1 = new Player('John');
const player2 = new Player('Doe');
player2.cords.x = 100;
players.push(player1);
players.push(player2);

const canvas = document.getElementById('canvas');
if (!canvas) { throw new Error('Canvas not found!'); }
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const /** @type {CanvasRenderingContext2D} **/ ctx = canvas.getContext('2d');

const floor = canvas.height - player1.size.height;
playerMoveEvent(player1, floor);

let lastFrameTime = performance.now();
let fps = 0;

function AnimationLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    fps = Math.floor(1000 / deltaTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePosition(players, deltaTime);
    addGravity(players, floor, deltaTime);
    drawPlayers(ctx, players, canvas);

    displayFPS(ctx, fps);

    requestAnimationFrame(AnimationLoop);
}

AnimationLoop();
