import Player from "./classes/player.js";

const player = new Player('player1');

const button = document.getElementById('button');
if (!button) { throw new Error('Button not found!'); }

const socket = new WebSocket('ws://localhost:6969/ws');

socket.onopen = function() {
    socket.send(JSON.stringify({ type: 'join', player: player }));
};

socket.onmessage = function(event) {
    console.log("Server response:", event.data);
};
