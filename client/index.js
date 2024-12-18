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
const player1 = new Player('John');
player1.cords.x = 200;
players.push(player1);

const /** @type {Prop[]} **/ props = [];
const prop = new Prop({ x: 200, y: 200 }, { width: 200, height: 200 });
props.push(prop);

let lastFrameTime = performance.now();
let fps = 0;

const updatePlayerMovement = playerMoveEvent();

function AnimationLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    fps = Math.floor(1000 / deltaTime);

    updatePlayerMovement(player1);

    players.forEach(player => {
        player.clear(ctx);
        player.addGravity(deltaTime, canvas);
        player.updatePosition(deltaTime, canvas);
        player.draw(ctx);
    });

    props.forEach(prop => {
        prop.draw(ctx);
    });

    displayFPS(ctx, fps);

    requestAnimationFrame(AnimationLoop);
}

AnimationLoop();

